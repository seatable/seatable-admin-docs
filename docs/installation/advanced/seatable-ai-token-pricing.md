# AI Token Pricing

## AI Credits

AI credits serve as an internal unit of currency for measuring AI-related usage within SeaTable.
They are directly linked to the number of tokens consumed by using AI-based features according to the [configured price](#pricing-configuration) of each AI model.

SeaTable supports role-based AI credit limits by configuring the `ai_credit_per_user` option on a user role.
Please refer to the documentation on [user quotas](../../configuration/roles-and-permissions.md#user-quotas) for more details.

!!! note "`ai_credit_per_user` for organization users"
    AI credits are shared across all users inside a SeaTable organization. The total number of credits can be calculated by multiplying the value of `ai_credit_per_user` by the number of team users.

    **Example:** Setting `ai_credit_per_user` to `2` will allow a team with 10 members to have 20 AI credits in total.

## Pricing Configuration

In order to accurately track the number of AI credits used by users and organizations, you must configure token pricing inside `/opt/seatable-server/seatable/conf/dtable_web_settings.py`.
This can be achieved by configuring the `AI_PRICES` variable, which is a dictionary that maps model identifiers (e.g `gpt-4o-mini`) to token pricing **per thousand tokens**:

```py
AI_PRICES = {
    "gpt-4o-mini": {
        "input_tokens_1k": 0.01827, # price / 1000 tokens
        "output_tokens_1k": 0.07309 # price / 1000 tokens
    },
}
```

!!! warning "Model Identifiers"
    The dictionary key must match **the exact value** of the chosen AI Model, which is configured through the `SEATABLE_AI_LLM_MODEL` variable inside your `.env` file.
    In case of a mismatch, AI usage will not count towards any configured credit limits!
