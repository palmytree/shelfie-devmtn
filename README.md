# Shelfie Devmtn Skills Check

[Grading Criteria](https://github.com/palmytree/simulation-1)
## My changes:
- Integrated product edit functionality into product cards instead of through single form for better user experience while meeting required competencies outlined in rubric.
- Instead of using params on the Router match object with the form (not outlined as a requirement in the rubric), I used a Redirect component combined with a state boolean on the form that when triggered, sends a "fromAddFrom" boolean on the routers location.state object which triggers the inventory refresh for the added item to appear.
- Added back-to-top button that slides into view when user scrolls down dashboard
- Added confirmation message on delete
- Added responsive design
- Served react app through static build