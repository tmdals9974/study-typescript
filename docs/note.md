# Section 0. 타입스크립트 시작하기

## 1. 타입스크립트란?

- `Javascript`: 동적 타입 언어. 변수의 타입은 런타임에 결졍된다.
  - `동적타입 언어`: 진입 장벽이 낮고, 코드의 양이 적을 때 생산성이 높다. 타입 오류가 런타임 시 발견된다. (Python, PHP)
- `Typescript`: 정적 타입 언어. 변수의 타임이 컴파일 타임에 결졍된다. 자바스크립트의 슈퍼셋.
  - `정적타입 언어`: 진입 장벽이 높고, 코드의 양이 많을 때 생산성이 높다. 타입 오류가 컴파일 시 발견된다. (Java, C#)
  - Microsoft에서 개발/관리함. 그래서 VSCode와도 궁합이 잘맞음.

## 2. 타입스크립트를 사용하는 이유: 높은 생산성

- IDE가 정적타입언어를 분석하여 여러 기능을 제공해주어 높은 생산성을 제공

## 3. 타입스크립트 설치부터 컴파일까지

```shell
# node project init
npm init -y

# typescript download
npm i typescript

# typescript config file init
npx tsc --init

# typescript compile
npx tsc
```

## 4. 타입스크립트 실행 방법 및 몇가지 팁

1. 타입스크립트 정석적인 실행방법

```shell
# typescript compile
npx tsc

# 컴파일 된 js파일을 실행
node index.js
```

2. `Code Runner` 사용

- VSCode Extension `Code Runner` 설치
- `npm install ts-node`
- settings.json에 아래와 같이 설정

```json
  "code-runner.executorMap" : {
    "typescript": "node_modules/.bin/ts-node"
  }
```

- 줄단위/파일단위로 Code Runner를 실행하여 타입스크립트 실행 가능

3. `Playground` 이용

- Typescript 공식 홈페이지 내 Playground를 이용하여 실행
