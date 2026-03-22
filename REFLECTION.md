# Reflection

## 1. Code Walkthrough
### useApplicants.js
I created it on its own to keep the components and pages cleaner. Having the logic in one place means the code is well structured and can be easily updated based on my needs. For example, I updated `useApplicants` multiple times as I was adding features: first for the search bar, then the GPA range filter, and later the column sorting. The components only needed small updates to pass the new parameters.

The scoring formula lives in its own computeTotalScore function, separate from the rest of the composable. I made this decision because the formula is needed in both the list page and the detail page. Keeping it separate means I don't duplicate code, and if the weights ever change, I only update them in one place. 

For sorting, I created a `getValue` function that handles all columns the same way. However, the status column needed its own sorting since you can't sort "accepted", "waitlisted", and "rejected" either numerically or alphabetically in a meaningful way. So I created a STATUS_RANK object that maps each status to a number: accepted = 3, waitlisted = 2, rejected = 1, and no status = 0. This way, the sort function treats status like any other column without needing a special function.

### Detail Page
The second thing I want to walk through is the detail page I decided to split the detail page into two separate components: ApplicantDetail.vue and ScoreBreakdown.vue.
-For ApplicantDetail.vue, I wanted to show the scores visually using progress bars, where I used a ScoreBar component. The GPA bar was a special case since it's on a 4.0 scale, I had to handle it differently from the other scores, which are all out of 100. I also reused computeTotalScore from the composable here, so the total score shown on the detail page always matches the list page.
-For ScoreBreakdown.vue I wanted to show the actual math behind the total score, not just the final number. I created a card where I extracted the data of the corresponding applicant and filled in the formulas that I used to calculate the total score, and displayed these formulas for the user to read. The GPA conversion is also explained since I normalized it and made it over 100.

## 2. What Claude Code Got Wrong

1. Issue 1: When I asked Claude Code to create the applicants' data file, it created it outside the project folder. If I hadn't noticed, it would have caused import errors when trying to use the data. I caught it  and moved it to the correct location inside the project.
2. Disagreement: When I asked Claude Code to add a GPA range filter, it implemented it as a static dropdown with hardcoded ranges like " between 2.0 and 2.5" and "between 2.5 and 3.0". I disagreed with this approach; it felt like a poor user experience since the user couldn't freely define their own range. Claude also included 4.5 as an option in the dropdown even though GPA maxes out at 4.0, which was a clear factual error. I replaced it with two dropdowns, a min and a max, where the user can pick any value on a 0.5 scale between 0 and 4.0.

## 3. Beyond the Core Requirements
**GPA Range Filter**
The core requirements asked for a minimum GPA filter. I extended it to a min and max range using two dropdowns on a 0.5 scale. A real committee might want to focus on a specific range, not just filter out low GPAs. I chose dropdowns because they keep the values clean and less risky than using text inputs, since we cannot trust the user, we always have to validate their inputs.

**Applicant Status**
I added accept, waitlist, and reject statuses visible on both the list and detail page, persisted in localStorage. A committee needs to track decisions, not just view scores. The trade-off is that localStorage isn't a real backend, and statuses are lost if browser data is cleared, which is why adding a proper database is my first improvement with more time.

## 4. Working with an Unfamiliar Framework + AI Tooling
Nuxt 3 was completely new to me, so I relied on Claude Code not just to write code but to help me understand framework-specific things like why the logic folder is called composables, how auto-imports work, and the difference between ':value' and 'value', or when to use ':v-for'.
- What was easier than expected was getting features running quickly. I had the logic and product decisions, and Claude had the framework knowledge.
- What was harder was deciding when to trust Claude's output. Since the framework was unfamiliar, I couldn't always tell immediately if something was wrong. My approach was to read every change Claude made before approving it and test the full feature flow before every commit. That's how I caught issues like the wrong file location and the incorrect GPA filter. Understanding the code was more important to me than just getting it working.
