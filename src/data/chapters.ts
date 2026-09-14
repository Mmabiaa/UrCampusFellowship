export type ChapterStatus = "active" | "coming soon" | "draft"

export type Chapter = {
  name: string
  denomination: string
  campus: string
  status: ChapterStatus
  day?: string
  time?: string
  location?: string
  description?: string
}

export const chapters: Chapter[] = [
  {
    name: "Campus Christian Fellowship",
    denomination: "Campus Christian Fellowship",
    campus: "Main Campus",
    status: "active",
    day: "Friday",
    time: "6:00 PM",
    location: "Fellowship Hall, Block C",
    description:
      "A welcoming community growing together in faith, friendship, and service.",
  },
  {
    name: "Deeper Life Campus Fellowship",
    denomination: "Deeper Life Bible Church",
    campus: "Main Campus",
    status: "active",
    day: "Wednesday",
    time: "5:30 PM",
    location: "Old Lecture Theatre",
    description: "Students seeking a deeper walk with God and one another.",
  },
  {
    name: "Methodist Students Union",
    denomination: "Methodist Church Ghana",
    campus: "Main Campus",
    status: "coming soon",
    description:
      "This chapter is preparing its welcome. Leave your details and we will let you know when it is ready.",
  },
  {
    name: "Presbyterian Students Fellowship",
    denomination: "Presbyterian Church of Ghana",
    campus: "Essikado",
    status: "active",
    day: "Sunday",
    time: "4:00 PM",
    location: "Presby Hall",
    description:
      "A joyful student fellowship rooted in scripture, music, and community.",
  },
  {
    name: "Catholic Students Union",
    denomination: "Catholic Church",
    campus: "Essikado",
    status: "coming soon",
    description:
      "A chapter is being set up on this campus. Be the first to hear when it opens.",
  },
]

export const campuses = ["Main Campus", "Essikado"] as const

export const rosterMembers = [
  ["KA", "Kwame Asante", "Computer Science · Level 300"],
  ["AM", "Akosua Mensah", "Business Administration · Level 200"],
  ["EN", "Esi Nkrumah", "Civil Engineering · Level 100"],
  ["YO", "Yaw Ofori", "Accounting · Level 400"],
] as const

export const denominationRows = [
  ["Campus Christian Fellowship", "Main Campus · 4 chapters"],
  ["Deeper Life Bible Church", "Main Campus · 3 chapters"],
  ["Methodist Church Ghana", "Main Campus · 2 chapters"],
  ["Presbyterian Church of Ghana", "Essikado · 2 chapters"],
] as const

export const invitations = [
  ["head@methodiststudents.org", "Methodist Students Union", "Pending"],
  ["admin@presbyfellowship.org", "Presbyterian Students Fellowship", "Accepted"],
  ["chapter@catholicstudents.org", "Catholic Students Union", "Pending"],
] as const
