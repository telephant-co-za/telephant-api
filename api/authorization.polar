resource(_type: Org, "org", actions, roles) if
    actions = ["read", "create_repo"] and
    roles = {
        member: {
            permissions: ["read"],
        },
        owner: {
            permissions: ["read", "create_repo"],
        }
    };