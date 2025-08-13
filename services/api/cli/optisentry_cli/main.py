import typer, requests, os
app = typer.Typer(help="OptiSentry CLI")
def base(): return os.getenv("OPTISENTRY_URL","http://localhost:8000")
def token(): return os.getenv("OPTISENTRY_TOKEN","")

@app.command()
def login(tenant_name: str, email: str, password: str):
    r = requests.post(base()+"/auth/signup", json={"tenant_name":tenant_name,"email":email,"password":password}); r.raise_for_status(); print(r.json()["access_token"])

if __name__ == "__main__":
    app()
