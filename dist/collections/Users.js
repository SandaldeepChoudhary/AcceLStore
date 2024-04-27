"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href=\"".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "\">Verify</a>");
            },
        },
    },
    access: {
        read: function () { return true; }, //Anyone can read users
        create: function () { return true; }, //Anyone can create users
    },
    fields: [
        {
            name: "role",
            defaultValue: "user",
            required: true,
            admin: {
                condition: function () { return false; },
                // condition: ({req})=> req.user.role === "admin"
            },
            type: "select",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                },
            ],
        },
    ],
};
