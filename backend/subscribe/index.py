import json
import os
import psycopg2


def resp(status: int, headers: dict, data: dict) -> dict:
    return {"statusCode": status, "headers": headers, "body": json.dumps(data, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    """Сохраняет email пользователя в список ожидания FlirtBot."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": "{}"}

    if event.get("httpMethod") != "POST":
        return resp(405, headers, {"error": "Method not allowed"})

    body = json.loads(event.get("body") or "{}")
    email = (body.get("email") or "").strip().lower()

    if not email or "@" not in email or "." not in email.split("@")[-1]:
        return resp(400, headers, {"error": "Некорректный email"})

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("SELECT id FROM subscribers WHERE email = %s", (email,))
    exists = cur.fetchone()

    if exists:
        cur.close()
        conn.close()
        return resp(200, headers, {"status": "already", "message": "Вы уже в списке!"})

    cur.execute("INSERT INTO subscribers (email) VALUES (%s)", (email,))
    conn.commit()
    cur.close()
    conn.close()

    return resp(200, headers, {"status": "ok", "message": "Подписка оформлена!"})
