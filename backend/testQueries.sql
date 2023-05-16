SELECT Users.id, Users.firstName, Users.lastName, Groups.name, Memberships.status FROM Users
JOIN Memberships ON (Users.id = Memberships.userId)
JOIN Groups ON (Groups.id = Memberships.groupId);
