## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Video Link

Open [https://www.loom.com/share/47c17beaf759432f86fd18265ff525d5?sid=88c87139-3e9e-44f0-91cf-e57af414c8a6] (Loom Video Link) to view my video. Ps. I think Loom sped it up.

## Database schema to persist the results in Prisma

```javascript

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model WorkType {
  id              Int               @id @default(autoincrement())
  workType        String
  PermitQuestions PermitQuestions[]
}

// This will hold the questions that we want to ask based on the workType
model PermitQuestions {
  id                            Int                             @id @default(autoincrement())
  question                      String
  createdAt                     DateTime                        @default(now()) @db.Timestamp()
  updatedAt                     DateTime
  deletedAt                     DateTime?                       @db.Timestamp()
  workTypeId                    Int
  WorkType                      WorkType                        @relation(fields: [workTypeId], references: [id])
  permitQuestionOptionsRelation PermitQuestionOptionsRelation[]
}
// This table will hold the list of options. These options will later be associated with PermitQuestions
model PermitQuestionOptions {
  id                            Int                             @id @default(autoincrement())
  option                        String
  optionType                    String
  description                   String?
  createdAt                     DateTime                        @default(now()) @db.Timestamp()
  updatedAt                     DateTime
  deletedAt                     DateTime?                       @db.Timestamp()
  permitQuestionOptionsRelation PermitQuestionOptionsRelation[]
}
// This table will hold the relationship between Questions and Question Options
model PermitQuestionOptionsRelation {
  id                    Int                   @id
  permitQuestion        PermitQuestions       @relation(fields: [permitQuestionsId], references: [id])
  permitQuestionOptions PermitQuestionOptions @relation(fields: [permitQuestionOptionsId], references: [id])

  permitQuestionsId       Int
  permitQuestionOptionsId Int
}
// We will declear a use with a user ID
model User {
  id        Int       @id @default(autoincrement())
  firstName String
  lastName  String
  email     String
  createdAt DateTime  @default(now()) @db.Timestamp()
  updatedAt DateTime
  deletedAt DateTime? @db.Timestamp()
}
// This will be the user answers question identifier so we will store what question the user is answering
model UserAnswerOptions {
  id                      Int       @id @default(autoincrement())
  permitQuestionOptionsId Int
  userAnswerid            Int
  createdAt               DateTime  @default(now()) @db.Timestamp()
  updatedAt               DateTime
  deletedAt               DateTime? @db.Timestamp()
}

// This table will track the option/answers that the user provided.
// We can create a jwt token using the user information. The token will then be used on the frontend.

model UserAnswer {
  id                Int       @id @default(autoincrement())
  permitQuestionsId Int
  userId            Int
  createdAt         DateTime  @default(now()) @db.Timestamp()
  updatedAt         DateTime
  deletedAt         DateTime? @db.Timestamp()
}

// While the schema outlined above is capable of storing the answers, an alternative approach is to utilize a JSONB column to store both the answers and their associated text. However, employing this method may introduce data redundancy, which is generally not ideal.


```

Extending this app

The best way to make this app even better is to keep all the important information in the database. When a user sends their answer, the backend will give back the results. The part of the app that decides if someone needs a permit or not should definitely be in the backend. Since PermitFlow covers many different municipalities processes, we'll need to figure out what rules are the same everywhere and what rules are different. We'll need a system where we can put in the requirements in the database. Sometimes, we might even need to create special parts of the app just for certain governments workflows. It's not always easy, especially when working with municipalities, but it's definitely doable. There should also be some frontend validation such as Yup.

# Application backend

Because the app was not built using nextjs, the backend is a different NodeJS App. The architecture for the backend would be as follows:

- Use Prisma
- Use Express
- Use Jwt for auth
