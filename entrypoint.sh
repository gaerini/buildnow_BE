#!/bin/sh

# 데이터베이스 서버가 준비될 때까지 대기
echo "Waiting for postgres..."
while ! nc -z pg 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

# 시드 명령 실행
echo "Running npm run seed"
npm run seed

# 애플리케이션 실행
exec npm run start
