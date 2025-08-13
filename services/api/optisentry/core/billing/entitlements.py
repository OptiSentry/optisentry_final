PLAN_FLAGS = {
    "free": {"models": 1, "predictions_per_day": 1000},
    "pro": {"models": 5, "predictions_per_day": 100000},
    "business": {"models": 25, "predictions_per_day": 1000000},
    "enterprise": {"models": 1000, "predictions_per_day": 1000000000},
}
def get_limits(plan: str) -> dict:
    return PLAN_FLAGS.get(plan, PLAN_FLAGS["free"])
