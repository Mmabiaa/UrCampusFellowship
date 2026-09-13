# UrCampusFellowship

**Find your fellowship. Join your community. All in one tap.**

UrCampusFellowship is a platform that helps university students in Ghana find and join their campus religious fellowship — and get connected straight into the right WhatsApp group — without ever being stopped on campus by someone taking down names and numbers.

---

## The Problem

Every semester, freshers struggle to find the denomination or fellowship they're looking for on campus. At the same time, fellowships struggle to reach new students — usually by walking around campus collecting names and phone numbers by hand, or relying on flyers and word of mouth. Meeting times, locations, and contact details are rarely written down anywhere a student can actually find them.

## The Solution

UrCampusFellowship brings all of that into one place:

- **Students** browse fellowships by campus, find the one they're looking for, and see real meeting details — no more guesswork.
- **Registering** takes a minute, and getting added to the fellowship's WhatsApp group is instant — no waiting on anyone's approval.
- **Fellowship leaders** get a simple dashboard to manage their own members, without ever seeing anyone else's.
- A **system administrator** keeps the overall directory running — adding new fellowships and campuses as the platform grows — without needing access to any student's personal information.

---

## How It Works

### For Students

1. Sign up with your email
2. Pick your campus
3. Browse fellowships, or search for the one you're looking for
4. Register — you're in. Tap through to join the WhatsApp group right away
5. Come back anytime to update your details, or leave your fellowship if you ever need to

### For Fellowship Leaders

1. Set up your fellowship's page: meeting day, time, location, and WhatsApp group
2. See everyone who's registered under your fellowship — and only your fellowship
3. Keep your roster accurate by flagging or removing members as needed

### For the System Administrator

1. Add new fellowships and campuses to the directory
2. Assign a leader to each fellowship chapter
3. Keep an eye on the overall health of the platform — without wading through anyone's personal data

---

## Highlights

- 📍 **Campus-aware** — a fellowship with chapters on more than one campus shows the right one to the right students
- ⚡ **Instant WhatsApp access** — no pending applications, no waiting around
- 🔒 **Privacy by design** — a fellowship leader only ever sees their own members, never another chapter's
- 🙋 **One fellowship at a time** — keeps rosters honest and avoids duplicate sign-ups
- 🔔 **"Coming soon" chapters** — new fellowships can start building interest before they're fully set up

---

## Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.2
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **State**: React Context API

### Backend (Planned)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Hosting**: Vercel

### Development
- **Package Manager**: npm
- **Linting**: ESLint (Next.js config)
- **Formatting**: Prettier
- **Version Control**: Git

---

## Project Status

This project is being built in distinct phases, and each one is fully thought through before moving to the next:

- ✅ Requirements
- ✅ System Design
- ✅ UI/UX Wireframes
- ✅ Frontend Implementation
- 🚧 Backend Integration — in progress
- 📋 Testing & Deployment — planned

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mmabiaa/urcampusfellowship.git

# Navigate to project directory
cd urcampusfellowship

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

---

## Project Structure

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── (auth)/             # Authentication pages
│   ├── (student)/          # Student-facing pages
│   ├── (head)/             # Chapter head dashboard
│   └── (admin)/            # Admin dashboard
├── components/
│   ├── ui/                 # shadcn/ui components (40+)
│   ├── shared/             # Reusable components
│   ├── layouts/            # Layout wrappers
│   └── pages/              # Page-specific components
├── providers/              # React Context providers
├── lib/                    # Utilities and data
├── types/                  # TypeScript type definitions
└── hooks/                  # Custom React hooks
```

---

## Features

### Current
- Student authentication and onboarding
- Campus fellowship directory with search
- Chapter details and registration
- WhatsApp group integration
- Student profile management
- Chapter head member management
- Admin dashboard and controls
- Responsive design with dark mode

### Planned
- Email verification
- Real-time updates
- Push notifications
- Multi-university support
- Analytics dashboard
- Mobile app (React Native)

---

## Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting pull requests.

---

## Get Involved

- **Students**: If you're part of a fellowship on campus and want to be one of the first to join, reach out!
- **Fellowship Leaders**: Interested in managing your chapter through the platform? Let's talk.
- **Developers**: Want to contribute? Check our [issues](https://github.com/mmabiaa/urcampusfellowship/issues) or [contributing guide](CONTRIBUTING.md).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, suggestions, or partnership inquiries, reach out to:

- **Email**: [mmaabiaa@gmail.com](mailto:mmaabiaa@google.com)
- **GitHub**: [@mmabiaa](https://github.com/mmabiaa)

---

## Acknowledgments

Built with ❤️ for campus communities in Ghana.

Special thanks to all fellowship leaders, students, and contributors who are helping make campus fellowship discovery easier for everyone.

---

© 2026 UrCampusFellowship. Made for campus communities in Ghana.
