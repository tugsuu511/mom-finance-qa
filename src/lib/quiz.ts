export type QuizAnswerKey =
  | "oneOnOne7d"
  | "talkStyle"
  | "childShares"
  | "parentListening"
  | "lieSuspicion"
  | "rulesClarity"
  | "anger2w"
  | "sadness2w"
  | "sleep"
  | "appetite"
  | "schoolStress"
  | "praiseFreq"
  | "introducesFriends"
  | "peerInfluence"
  | "alonePreference"
  | "curfewConflict"
  | "bullyingConcern"
  | "screenTime"
  | "screenRules"
  | "secretAccounts"
  | "moodAfterSocial"
  | "chores"
  | "reactionToMistake"
  | "moneyTalk"
  | "autonomy";

export type QuizAnswerValue = string;

export type QuizAnswerMap = Record<QuizAnswerKey, QuizAnswerValue>;

export type QuizOption = { value: string; label: string };

export type QuizQuestion = {
  key: QuizAnswerKey;
  type: "number" | "radio" | "checkbox";
  label: string;
  helper?: string;
  options?: QuizOption[];
};

export const quizSteps: QuizQuestion[][] = [
  [
    {
      key: "oneOnOne7d",
      type: "radio",
      label: "Сүүлийн 7 хоногт ганцаарчилсан ярилцлага хэдэн удаа болсон бэ?",
      options: [
        { value: "none", label: "Огт" },
        { value: "1", label: "1 удаа" },
        { value: "2-3", label: "2-3 удаа" },
        { value: "4+", label: "4 ба түүнээс олон" },
      ],
    },
  ],
  [
    {
      key: "talkStyle",
      type: "radio",
      label: "Тантай ярилцахад голдуу ямар хэлбэр давамгайлдаг вэ?",
      options: [
        { value: "conflict", label: "Маргаантай" },
        { value: "command", label: "Зөвхөн тушаах" },
        { value: "general", label: "Ерөнхий яриа" },
        { value: "open", label: "Нээлттэй, халуун" },
      ],
    },
  ],
  [
    {
      key: "childShares",
      type: "radio",
      label: "Хүүхэд өөрийнхөө тухай хуваалцдаг уу?",
      options: [
        { value: "never", label: "Огт" },
        { value: "sometimes", label: "Заримдаа" },
        { value: "often", label: "Ихэнхдээ" },
      ],
    },
  ],
  [
    {
      key: "parentListening",
      type: "radio",
      label: "Та хүүхдээ сонсохдоо ихэвчлэн хэрхэн ханддаг вэ?",
      options: [
        { value: "scold", label: "Зэмлэх" },
        { value: "advice", label: "Зөвлөх" },
        { value: "curious", label: "Сонирхож асуух" },
      ],
    },
  ],
  [
    {
      key: "lieSuspicion",
      type: "radio",
      label: "Хүүхэд худлаа хэлдэг мэт санагддаг уу?",
      options: [
        { value: "often", label: "Ихэнхдээ" },
        { value: "sometimes", label: "Заримдаа" },
        { value: "rare", label: "Ховор" },
      ],
    },
  ],
  [
    {
      key: "rulesClarity",
      type: "radio",
      label: "Гэрийн дүрэм тодорхой юу?",
      options: [
        { value: "no", label: "Тодорхой биш" },
        { value: "medium", label: "Дунд зэрэг" },
        { value: "yes", label: "Тодорхой" },
      ],
    },
  ],
  [
    {
      key: "anger2w",
      type: "radio",
      label: "Сүүлийн 2 долоо хоногт уур бухимдал хэр их ажиглагдсан бэ?",
      options: [
        { value: "high", label: "Өндөр" },
        { value: "medium", label: "Дунд" },
        { value: "low", label: "Бага" },
      ],
    },
  ],
  [
    {
      key: "sadness2w",
      type: "radio",
      label: "Сүүлийн 2 долоо хоногт гунигтай, дүнсгэр байдал ажиглагдсан уу?",
      options: [
        { value: "high", label: "Өндөр" },
        { value: "medium", label: "Дунд" },
        { value: "low", label: "Бага" },
      ],
    },
  ],
  [
    {
      key: "sleep",
      type: "radio",
      label: "Нойрны байдал",
      options: [
        { value: "very_bad", label: "Маш муу" },
        { value: "somewhat", label: "Дунд зэрэг" },
        { value: "ok", label: "Хэвийн" },
      ],
    },
  ],
  [
    {
      key: "appetite",
      type: "radio",
      label: "Хоолны дуршил",
      options: [
        { value: "very_changed", label: "Их өөрчлөгдсөн" },
        { value: "somewhat", label: "Зарим өөрчлөлттэй" },
        { value: "normal", label: "Хэвийн" },
      ],
    },
  ],
  [
    {
      key: "schoolStress",
      type: "radio",
      label: "Сургуультай холбоотой стресс",
      options: [
        { value: "high", label: "Өндөр" },
        { value: "medium", label: "Дунд" },
        { value: "low", label: "Бага" },
      ],
    },
  ],
  [
    {
      key: "praiseFreq",
      type: "radio",
      label: "Магтаал, дэмжлэг үзүүлэх давтамж",
      options: [
        { value: "never", label: "Огт" },
        { value: "sometimes", label: "Заримдаа" },
        { value: "often", label: "Ихэнхдээ" },
      ],
    },
  ],
  [
    {
      key: "introducesFriends",
      type: "radio",
      label: "Найзуудаа гэртээ танилцуулдаг уу?",
      options: [
        { value: "no", label: "Огт" },
        { value: "some", label: "Заримдаа" },
        { value: "yes", label: "Тийм" },
      ],
    },
  ],
  [
    {
      key: "peerInfluence",
      type: "radio",
      label: "Найзуудын нөлөө хэр их байдаг вэ?",
      options: [
        { value: "high", label: "Өндөр" },
        { value: "medium", label: "Дунд" },
        { value: "low", label: "Бага" },
      ],
    },
  ],
  [
    {
      key: "alonePreference",
      type: "radio",
      label: "Ганцаараа байх дуртай байдал",
      options: [
        { value: "high", label: "Өндөр" },
        { value: "medium", label: "Дунд" },
        { value: "low", label: "Бага" },
      ],
    },
  ],
  [
    {
      key: "curfewConflict",
      type: "radio",
      label: "Гэртээ ирэх цагийн зөрчил",
      options: [
        { value: "high", label: "Өндөр" },
        { value: "medium", label: "Дунд" },
        { value: "low", label: "Бага" },
      ],
    },
  ],
  [
    {
      key: "bullyingConcern",
      type: "radio",
      label: "Дээрэлхэлттэй холбоотой санаа зовнил байна уу?",
      options: [
        { value: "yes", label: "Тийм" },
        { value: "unsure", label: "Тодорхойгүй" },
        { value: "no", label: "Үгүй" },
      ],
    },
  ],
  [
    {
      key: "screenTime",
      type: "radio",
      label: "Өдөрт дэлгэцийн цаг ойролцоогоор",
      options: [
        { value: "6+", label: "6+ цаг" },
        { value: "3-6", label: "3-6 цаг" },
        { value: "<3", label: "3 цагаас бага" },
      ],
    },
  ],
  [
    {
      key: "screenRules",
      type: "radio",
      label: "Дэлгэцийн хэрэглээний дүрэм",
      options: [
        { value: "none", label: "Байхгүй" },
        { value: "exists_not_followed", label: "Байдаг ч мөрддөггүй" },
        { value: "followed", label: "Мөрддөг" },
      ],
    },
  ],
  [
    {
      key: "secretAccounts",
      type: "radio",
      label: "Нууц аккаунт байдаг эсэх",
      options: [
        { value: "yes", label: "Тийм" },
        { value: "maybe", label: "Магадгүй" },
        { value: "no", label: "Үгүй" },
      ],
    },
  ],
  [
    {
      key: "moodAfterSocial",
      type: "radio",
      label: "Сошиал ашигласны дараах сэтгэл санаа",
      options: [
        { value: "high", label: "Сөрөг их" },
        { value: "medium", label: "Дунд зэрэг" },
        { value: "low", label: "Бага" },
      ],
    },
  ],
  [
    {
      key: "chores",
      type: "radio",
      label: "Гэрийн ажил/үүргийн оролцоо",
      options: [
        { value: "none", label: "Огт" },
        { value: "some", label: "Зарим" },
        { value: "regular", label: "Тогтмол" },
      ],
    },
  ],
  [
    {
      key: "reactionToMistake",
      type: "radio",
      label: "Алдаа гаргавал хариу үйлдэл",
      options: [
        { value: "punish", label: "Шийтгэх" },
        { value: "explain", label: "Тайлбарлах" },
        { value: "solve_together", label: "Хамтдаа шийдэх" },
      ],
    },
  ],
  [
    {
      key: "moneyTalk",
      type: "radio",
      label: "Мөнгөний асуудлаар ярихад",
      options: [
        { value: "overcontrol", label: "Хэт хянах" },
        { value: "balanced", label: "Тэнцвэртэй" },
        { value: "avoid", label: "Зайлсхийх" },
      ],
    },
  ],
  [
    {
      key: "autonomy",
      type: "radio",
      label: "Өөрөө шийдвэр гаргах эрх чөлөө",
      options: [
        { value: "low", label: "Бага" },
        { value: "medium", label: "Дунд" },
        { value: "good", label: "Сайн" },
      ],
    },
  ],
];

export const defaultAnswers: QuizAnswerMap = {
  oneOnOne7d: "",
  talkStyle: "",
  childShares: "",
  parentListening: "",
  lieSuspicion: "",
  rulesClarity: "",
  anger2w: "",
  sadness2w: "",
  sleep: "",
  appetite: "",
  schoolStress: "",
  praiseFreq: "",
  introducesFriends: "",
  peerInfluence: "",
  alonePreference: "",
  curfewConflict: "",
  bullyingConcern: "",
  screenTime: "",
  screenRules: "",
  secretAccounts: "",
  moodAfterSocial: "",
  chores: "",
  reactionToMistake: "",
  moneyTalk: "",
  autonomy: "",
};
