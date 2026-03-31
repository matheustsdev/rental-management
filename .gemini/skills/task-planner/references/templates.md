# Task Planning Templates

## 1. Development Plan (`development-plan.md`)
- **Objective**: Detailed technical goal.
- **Architecture Impact**: Layers (Domain, App, Infra, UI) and files affected.
- **Database Changes**: Prisma schema updates or migrations needed.
- **Implementation Steps**: Numbered sequence of technical tasks.

## 2. Testing Plan (`testing-plan.md`)
- **Unit Tests**: Mocks needed for repositories and services.
- **Faker Scenarios**: Data sets to generate (Ex: "Overdue rental", "Invalid measurements").
- **Success Criteria**: What must happen for the feature to be "done".
- **Failure Cases**: Edge cases (Ex: "Out of stock", "Invalid dates").

## 3. User Documentation (`user-documentation.md`)
- **Feature Overview**: Simple explanation of what this adds for the user.
- **Business Rules**: Constraints (Ex: "Only dresses can have height measurements").
- **User Guide**: Step-by-step instructions with expected UI behavior.
- **Warnings**: Important details the user needs to know.
