# Emoji Password

This is a working project of an Emoji Password Tester for three different levels of security - Facebook, Email, Bank

Facebook -> User does not need to remember the order of the emojis.
Email    -> User needs to remember the exact order of the emojis.
Bank     -> User needs to remember the order of emojis & the 4 digit PIN assigned to them.

The app uses a NodeJS/ExpressJS backend, and HTML, CSS/Bootstrap & jQuery on the frontend to produce the views and AJAX requests. A log file of time taken for each step is created to analyze how exactly users react to this different password scheme.

Challenges we faced:
  - Spaghetti code as we are not 100% familiar with jQuery.
  - Properly using the json2csv module to not overwrite the csv file of generated logs.

What is ahead?
  - Collapsing the frontend, and using a dedicated framework like Angular 2 to encapsulate the views into components and have the logic in services instead of everything jumbled together.

Created by: [@awaisabir](https://github.com/awaisabir) and [@TheoJA](https://github.com/TheoJA).
