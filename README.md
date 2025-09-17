# Ticket system

## How to run

## Backend

Only admins can see and change the priority of a ticket.
<br>
e.g. an user wouldn't be happy to see that their ticket has low priority.

- Clean separation of concerns with modules: `Auth`, `Admin`, `Ticket`, `User`.
- Uses `dto` to protected and validate the endpoints.
- Uses `jwt` to authenticated admin users.
- Uses `sql` because having flexibility in queries on a ticket system are more important.

## Client

Follows a chat approach, thread linked by email.

- Uses `vite` for fast compiling time.
- Uses `react-query` to simplify requests and cache.
- Uses `mui-material` to simplify html/css.
- Uses `recoil`, a simple state manager, to save the last search of the user.

## Admin

Admins must provide a message when changing a ticket's status or priority.
<br>
This gives context for the change and helps track the ticket's change history (not implemented).

- Uses `angular-Material` and `flex-layout` to simplify html/css.
- Uses `guards` to protect routes.

## Next steps

- Use `.env`.
- Add logs to nestjs.
- Add pagination to `/tickets`.
- Add transactions e.g. ticket creation.
- Add tests (shame... ): ).
- Add dark mode to admin app.
- Invalidate jwt.
- Use the backend to filter, instead of the UI.
- Remove duplication of ticket priority and status strings.
- Reuse DTOs fields, removing duplication.
- `adminService.findAll()` is elegant, but hard to scale.
