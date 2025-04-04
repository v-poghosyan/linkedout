# LinkedOut - Delete All of Your LinkedIn Comments

## About

This script is for automated deletion of your LinkedIn comments.

**Disclaimer:** This script will delete *all* of your LinkedIn comments. It is created for that sole purpose. Use at your own risk.

## Why

As of now, LinkedIn doesn't offer a bulk-delete option for personal activity. There's a [data-deletion form](https://www.linkedin.com/help/linkedin/ask/TS-DDF) in an obscure location, and they're mandated by state laws (such as the California Consumer Privacy Act) to delete your data. However, if your account is restricted for *any* reason, they refuse your request. Restrictions are handed out very liberally for a lot of different reasons because it is in their interests to hoard your data.  

This tool aims to put *you* in charge of your own data. It exists because what should be a basic right requires technical intervention to exercise. 

## FAQ

### Is this legal?

I'm not a lawyer, but I believe data privacy is your right. It's *your* data, and you alone should be in charge of it.

That said, I'm sure that nobody can tell you how to use your own web browser. This script runs entirely *client side* and all it does is automate the manual interactions you'd otherwise have with your browser (using a mouse and a keyboard).

The European Union's GDPR established the "right to be forgotten". In the U.S. we have only state laws (such as the California Consumer Privacy Act (CCPA)). Yet, even in territories where these protections exist, platforms either don't comply with them or, if they do comply, they violate the spirit of these laws through obscuring the deletion workflow.

Your personal information isn't merely a corporate asset to be mined, analyzed, and monetized without recourse. The ability to withdraw consent — to erase your digital past — stands as the last line of defense against mass surveillance. You have the final say.

### Why does the script show error messages?

This script was developed as a practical solution for personal use rather than polished software. I don't particularly enjoy writing JavaScript on a Friday evening... 

While it may display various error messages during execution, it's perfectly functional (as of 04/02/25).

The errors are primarily harmless JavaScript console warnings that don't affect the deletion process. Interestingly, if you examine LinkedIn's own frontend code, you'll notice it generates numerous similar errors during normal operation. That's because LinkedIn is terrible.

### Will LinkedIn still retain my deleted content?

This is a legitimate concern. While these scripts remove your content from public view, it's difficult to know for certain what happens behind the scenes.

LinkedIn's privacy policy states they delete personal data when it's no longer necessary for the purposes collected, but like most platforms, their definition of "necessary" and retention timeframes are opaque.

For complete data removal, you may still want to follow up with LinkedIn's official data deletion process after using these scripts. If they refuse your request, you may want to reference applicable privacy regulations like GDPR (if you're in the E.U.) or CCPA (or equivalent state laws) in your communications. For long-term improvement of digital privacy rights, consider supporting advocacy organizations and legislation that strengthen individuals' control over their personal data.

### Will LinkedIn detect this script?

LinkedIn may temporarily restrict your account activity (through a temporary IP ban) if the automation runs too quickly. However, this script is designed to mimic human behavior. It uses time delays and synthetic mouse click events. This makes it undetectable. 
 
## How

1. Open your web browser
2. Go to the LinkedIn comments page. As of writing this, the URL is: https://www.linkedin.com/in/{username}/recent-activity/comments
3. Open your web browser's JavaScript console
4. Modify the `GLOBALS` section in the `linkedout.js` script. Simply change the `userName` variable to whatever your username is (in the LinkedIn URL).
5. Paste the contents of the `linkedout.js` script in the console and execute it!

You will see things happen. Comment threads will expand, delete dropdowns will be clicked, dialogues will appear confirming the deletions, etc. 

Depending on how many comments you have, it can take a while for the script to finish. Keep your browser open and check on it periodically. 

If the script gets stuck, or if it leaves some comments untouched, refresh the page and repeat steps 1-4.
