import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    auth: true,
    access: {
        read: ()=> true, //Anyone can read users
        create: ()=> true, //Anyone can create users
    },
    fields: [
        {
            name: "role",
            defaultValue: "user",
            required: true,
            admin: {
                condition: () => false,
                // condition: ({req})=> req.user.role === "admin"
            },
            type: "select",
            options: [
                {
                    label: "Admin", value: "admin",
                },
                {
                    label: "User", value: "user"
                },
            ]
        }
    ]
}