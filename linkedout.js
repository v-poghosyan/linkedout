// ==============
// GLOBALS      
// ==============
let userName = "Vahram Poghosyan" // Change to your username
// ==============
// END OF GLOBALS
// ==============

// ===========
// MAIN
// ===========
// Start the deletion process
console.log("Starting comment deletion process...");
deleteAllComments().then(() => {
    console.log("Comment deletion process finished");
});
// ===========
// END OF MAIN
// ===========

// ================
// UTILITIES
// ================
/**
* Halts execution for a certain amount of time (in seconds).
* @param {number} seconds - Time by which to halt execution
**/
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
* Simulates a more realistic click event to bypass detection
* @param {HTMLElement} element - The HTML element on which to simulate a natural click
**/
function simulateClick(element) {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(event);
}

/**
* Clicks the button "Show more results" to load more comments
**/
function showMoreResults() {
    // Find the "Show more results" button
    const button = Array.from(document.querySelectorAll('span.artdeco-button__text'))
        .find(span => span.textContent.trim() === "Show more results");
    
    if (!button) {
        console.log(`No more "Show more results" buttons found. You've reached the end of your activity.`);
        return false;
    }
        
    // Click the button
    console.log("Clicking 'Show more results' button...");
    simulateClick(button);
    return true;
}

/**
* Expands all "See more replies" sections on the comments page. Continues clicking until all reply sections are expanded
**/
async function expandAllReplies() {
    let moreToExpand = true;
    let expandCount = 0;
    
    console.log("Expanding all replies...");
    
    while (moreToExpand) {
        // Find all "See more replies" buttons
        const seeMoreButtons = Array.from(document.querySelectorAll('.comments-replies-list__replies-button'))
            .filter(button => {
                const span = button.querySelector('span');
                return span && span.textContent.trim().includes("See more replies");
            });
        
        if (seeMoreButtons.length == 0) {
            moreToExpand = false;
            console.log("All reply sections expanded.");
            break;
        }
        // Click each "See more replies" button
        for (const button of seeMoreButtons) {
            console.log(`Expanding reply section (${++expandCount})...`);
            simulateClick(button);
            
            // Wait for expansion animation and content to load
            await sleep(2);
        }
        // Add safety check to prevent infinite loops
        if (expandCount > 50) {
            console.log("Reached maximum number of expansions (50). Some replies may still be collapsed.");
            break;
        }
    }
}

/**
* Finds comment dropdown menus authored by the user.
* @param {string} userName - Your LinkedIn username
**/
function getMyCommentDropdowns(userName = "Vahram Poghosyan") {
    // Find spans with the user's name
    const spans = Array.from(document.querySelectorAll('.comments-comment-meta__description-title'))
        .filter(span => span.textContent.includes(userName));
    
    const commentDropdowns = [];
    // For each span, navigate to parent container and find options trigger
    for (const span of spans) {
        // Find the parent container
        const container = span.closest('.comments-comment-meta__container');
        if (!container) continue;
        
        // Find the options trigger within the container
        const dropdown = container.querySelector('button.artdeco-dropdown__trigger');
        if (dropdown) {
            commentDropdowns.push(dropdown);
        }
    }
    return commentDropdowns;
}

/**
* Deletes a single comment
* @param {HTMLElement} commentDropdown - A comment's dropdown button element
**/
async function deleteComment(commentDropdown) {
    // Click the comment dropdown to open options
    console.log("Clicking comment dropdown...");
    simulateClick(commentDropdown);
    await sleep(1)
    
    // Find the delete option in the dropdown
    const deleteSpan = Array.from(document.querySelectorAll('span.t-bold'))
        .find(span => span.textContent.trim() == "Delete");
    
    if (!deleteSpan) {
        console.log("Delete option not found in dropdown");
        return false;
    }
    
    // Click the delete button
    const deleteButton = deleteSpan.closest('div[role="button"].option-button');
    if (deleteButton) {
        console.log("Clicking delete option...");
        await sleep(2);
        deleteButton.click();
        
        // Find the confirmation dialog
        const confirmDialog = document.querySelector('div[role="dialog"].comments-delete-comment-modal');
        if (confirmDialog) {
            // Find the confirm delete button in the dialog
            const confirmSpan = Array.from(confirmDialog.querySelectorAll('span'))
                .find(span => span.textContent.trim() == "Delete");
            
            if (confirmSpan) {
                const confirmButton = confirmSpan.closest('button.artdeco-button--primary');
                if (confirmButton) {
                    console.log("Confirming deletion...");
                    simulateClick(confirmButton);
                    return true;
                }
            }
        }
    }
    console.log("Failed to delete comment");
    return false;
}

/**
* Main function to delete all comments. Runs continuously until there are no more comments to delete
**/
async function deleteAllComments() {
    let continueDeleting = true;
    
    while (continueDeleting) {
        // First, expand all "See more replies" sections
        await expandAllReplies();

        // Get all comment dropdowns by the user
        const commentDropdowns = getMyCommentDropdowns(userName);
        console.log(`Found ${commentDropdowns.length} comments to delete`);
        // console.log("All dropdowns:")
        // console.log(commentDropdowns)
        
        // Delete each comment with a random delay between actions
        for (const dropdown of commentDropdowns) {
            const success = await deleteComment(dropdown);
            console.log(success ? "Comment deleted successfully" : "Failed to delete comment");
            
            // Random delay between 2-3 seconds
            const randomDelay = 2 + Math.random();
            console.log(`Waiting ${randomDelay.toFixed(1)} seconds before next action...`);
            await sleep(randomDelay);
        }
        
        // After deleting all comments on the current page, try to load more
        moreComments = showMoreResults();
        console.log(moreComments ? "Expanding more comments..." : "Finished processing all comments, exiting deletion process...")
        await sleep(3); // Wait for the next batch to load
    }
}
// ================
// END OF UTILITIES
// ================