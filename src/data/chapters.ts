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

export type MemberDetails = {
  id: string
  initials: string
  name: string
  program: string
  level: string
  phone: string
  email: string
  campus: string
  hall: string
  joinedDate: string
  displayInfo: string
}

export const rosterMembers: MemberDetails[] = [
  {
    id: "1",
    initials: "KA",
    name: "Kwame Asante",
    program: "Computer Science",
    level: "300",
    phone: "0241234567",
    email: "kwame.asante@student.edu.gh",
    campus: "Main Campus",
    hall: "Unity Hall",
    joinedDate: "2 days ago",
    displayInfo: "Computer Science · Level 300",
  },
  {
    id: "2",
    initials: "AM",
    name: "Akosua Mensah",
    program: "Business Administration",
    level: "200",
    phone: "0557654321",
    email: "akosua.mensah@student.edu.gh",
    campus: "Main Campus",
    hall: "Casely-Hayford Hall",
    joinedDate: "5 days ago",
    displayInfo: "Business Administration · Level 200",
  },
  {
    id: "3",
    initials: "EN",
    name: "Esi Nkrumah",
    program: "Civil Engineering",
    level: "100",
    phone: "0209876543",
    email: "esi.nkrumah@student.edu.gh",
    campus: "Main Campus",
    hall: "Africa Hall",
    joinedDate: "1 week ago",
    displayInfo: "Civil Engineering · Level 100",
  },
  {
    id: "4",
    initials: "YO",
    name: "Yaw Ofori",
    program: "Accounting",
    level: "400",
    phone: "0264445555",
    email: "yaw.ofori@student.edu.gh",
    campus: "Main Campus",
    hall: "Republic Hall",
    joinedDate: "2 weeks ago",
    displayInfo: "Accounting · Level 400",
  },
]

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
