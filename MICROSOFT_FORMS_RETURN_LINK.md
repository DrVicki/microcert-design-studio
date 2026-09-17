# Microsoft Forms: Post-Registration Return Link

## Recommended return URL

Use the public Fieldbook address:

> https://www.micro-cert-fieldbook.org/

The direct application URL can serve as a fallback:

> https://microcertds-vvhxhqkn.manus.space/

Both addresses were verified as reachable before these instructions were prepared.

## Important limitation

Microsoft Forms does **not** provide a built-in automatic redirect to another website after a respondent submits a form. The supported approach is to customize the post-submission **thank-you message** and include a clear return URL. Microsoft documents the **Customize thank you message** setting, while Microsoft’s Forms guidance confirms that an automatic post-submit redirect is not available.[1][2]

## Configure the return message

1. Sign in to [Microsoft Forms](https://forms.office.com/) with the account that owns the registration form.
2. Open the Fieldbook registration form.
3. Select **Settings** in the form editor.
4. Under **Options for responses**, turn on **Customize thank you message**.
5. Paste the following message:

> Thank you for registering for Dr. Vicki Bealman’s Micro-Certification Fieldbook. Return to the Fieldbook to begin or continue your work: https://www.micro-cert-fieldbook.org/

6. Optional: enable **Hide Submit another response** if participants should not see a second-submission link on the completion page.
7. Close the Settings pane; Microsoft Forms saves the setting automatically.
8. Select **Collect responses**, copy the responder link, and submit one test response in a private browser window.
9. Confirm that the thank-you message displays the complete Fieldbook URL. If the tenant renders it as a clickable link, select it and verify the Fieldbook opens. If the tenant displays plain text only, respondents can copy the URL; Microsoft Forms does not expose HTML controls for forcing a custom hyperlink or automatic redirect in this message.
10. Check the form’s **Who can fill out this form** setting and choose **Anyone can respond**, **Only people in my organization can respond**, or **Specific people in my organization can respond** according to the intended audience and DeVry data-handling requirements.[1]

## Optional clearer wording inside the form

Add this sentence to the form description or final section so participants know what will happen before they submit:

> After you submit this registration, use the Fieldbook link in the confirmation message to return to the course. Microsoft Forms does not redirect automatically.

## Validation checklist

| Check | Expected result |
| --- | --- |
| Form opens from the Fieldbook Register control | Microsoft Forms opens in a new browser tab |
| Test response submits successfully | Microsoft Forms displays the customized thank-you message |
| Return address is visible | `https://www.micro-cert-fieldbook.org/` appears in full |
| Return address opens or can be copied | Participant can return to the live Fieldbook |
| Audience setting is correct | Only the intended respondent population can submit |
| Repeat-response setting is correct | Duplicate submissions are allowed or prevented intentionally |

## Sources

[1]: [Microsoft Support — Adjust your form or quiz settings in Microsoft Forms](https://support.microsoft.com/en-us/office/adjust-your-form-or-quiz-settings-in-microsoft-forms-f255a4ba-e03c-4e12-b880-f7e8b62e0665)

[2]: [Microsoft Learn Q&A — Redirect links in Microsoft Forms](https://learn.microsoft.com/en-us/answers/questions/5255532/redirect-links-in-microsoft-forms)
