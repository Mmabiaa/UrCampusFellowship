# UrCampusFellowship

**Find your fellowship. Join your community. All in one tap.**

UrCampusFellowship is a platform that helps university students in Ghana find and join their campus religious fellowship — and get connected straight into the right WhatsApp group — without ever being stopped on campus by someone taking down names and numbers.

---
![](/screenshots/landing-page.png)

## 📖 About

UrCampusFellowship bridges the gap between students seeking faith communities and campus fellowships looking to reach them. The platform provides a centralized directory where students can discover fellowships by denomination and campus, see real meeting details, and join instantly — with immediate access to WhatsApp groups for staying connected.

### Why UrCampusFellowship?

Every semester, freshers struggle to find the denomination or fellowship they're looking for on campus. At the same time, fellowships struggle to reach new students — usually by walking around campus collecting names and phone numbers by hand, or relying on flyers and word of mouth. Meeting times, locations, and contact details are rarely written down anywhere a student can actually find them.

UrCampusFellowship solves this by:

- **For Students**: Discover fellowships by campus and denomination, view meeting details, and join with one click
- **For Fellowship Leaders**: Manage chapter information, view registered members, and keep rosters up to date
- **For Administrators**: Maintain the directory, add new fellowships and campuses, and oversee platform health

---

## 🎯 How It Works

### For Students

1. **Discover**: Browse fellowships by campus or search for your denomination
2. **Connect**: View meeting details, times, locations, and leadership information
3. **Join**: Register in under a minute and get instant WhatsApp group access
4. **Belong**: Manage your profile and fellowship membership anytime

### For Fellowship Leaders

1. **Set Up**: Add meeting day, time, location, and WhatsApp group link
2. **Manage**: View your chapter's roster with member details (name, email, phone, program, hall, level)
3. **Maintain**: Flag members for follow-up or remove them when needed
4. **Grow**: Your chapter becomes visible to students browsing fellowships on your campus

### For System Administrators

1. **Organize**: Add new denominations, campuses, and fellowships to the directory
2. **Assign**: Create chapter head accounts and manage fellowship leadership
3. **Monitor**: View platform-wide statistics without accessing individual student data

---

## ✨ Key Features

- 📍 **Campus-aware** — Multi-campus support with campus-specific chapter listings
- ⚡ **Instant access** — No approval process; students join WhatsApp groups immediately
- 🔒 **Privacy by design** — Fellowship leaders only see their own members
- 🚫 **One fellowship rule** — Students can only be in one fellowship at a time
- 🎨 **Beautiful UI** — Clean, accessible design with consistent styling
- 📱 **Fully responsive** — Works seamlessly on desktop, tablet, and mobile
- 🔐 **Role-based access** — Different dashboards for students, chapter heads, and admins
- 📋 **Complete roster management** — Search, filter, and manage members efficiently
- 📄 **Legal compliance** — Terms of Service and Privacy Policy pages included

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16.3](https://nextjs.org/) (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4.3 with custom design system
- **UI Components**: 
  - shadcn/ui 4.11
  - Base UI (Headless components)
  - Radix UI primitives
  - Lucide React icons
- **Utilities**: 
  - clsx & tailwind-merge for conditional styling
  - class-variance-authority for component variants
- **Analytics**: Vercel Analytics

### Backend (Planned)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with email verification
- **Real-time**: Supabase Realtime subscriptions
- **Storage**: Supabase Storage for assets
- **API**: Next.js API Routes / Server Actions

### Infrastructure
- **Hosting**: Vercel
- **Package Manager**: pnpm 12.3
- **Version Control**: Git

---

## 📁 Project Structure

```
urcampusfellowship/
├── docs/                          # Documentation
│   ├── Requirements.docx          # Project requirements
│   ├── System_Design.docx         # System architecture
│   └── USER-STORIES.md            # User stories and use cases
├── screenshots/                   # Application screenshots
├── src/                           # Source code
│   ├── app/                       # Next.js App Router pages
│   │   ├── about/                 # About us page
│   │   ├── admin/                 # Admin dashboard
│   │   │   ├── chapter/           # Chapter management
│   │   │   │   └── new/           # Create new chapter
│   │   │   ├── denominations/     # Denomination management
│   │   │   │   └── new/           # Create new denomination
│   │   │   └── page.tsx           # Admin overview
│   │   ├── auth/                  # Authentication
│   │   │   ├── login/             # Chapter head login
│   │   │   └── signup/            # Student signup
│   │   ├── for-leaders/           # Leaders information page
│   │   ├── heads/                 # Chapter head dashboard
│   │   │   ├── roster/            # Member roster management
│   │   │   ├── setup/             # Chapter setup
│   │   │   └── page.tsx           # Head overview
│   │   ├── how-it-works/          # How it works page
│   │   ├── privacy/               # Privacy policy
│   │   ├── student/               # Student pages
│   │   │   ├── chapter/           # Chapter details
│   │   │   ├── register/          # Registration flow
│   │   │   ├── success/           # Success confirmation
│   │   │   └── page.tsx           # Fellowship directory
│   │   ├── terms/                 # Terms of service
│   │   ├── globals.css            # Global styles & design system
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Landing page
│   ├── components/                # React components
│   │   ├── admin/                 # Admin-specific components
│   │   │   └── admin-overview.tsx
│   │   ├── common/                # Shared components
│   │   │   ├── dashboard-shell.tsx  # Dashboard layout wrapper
│   │   │   ├── site-footer.tsx      # Site footer with legal links
│   │   │   └── site-header.tsx      # Site header & navigation
│   │   ├── heads/                 # Chapter head components
│   │   │   └── head-overview.tsx
│   │   ├── student/               # Student-specific components
│   │   │   ├── chapter-detail.tsx   # Chapter detail view
│   │   │   ├── home-page.tsx        # Student home
│   │   │   ├── register-page.tsx    # Registration form
│   │   │   ├── student-page.tsx     # Student profile
│   │   │   └── success-page.tsx     # Success screen
│   │   └── ui/                    # Base UI components
│   │       └── button.tsx         # Button component
│   ├── data/                      # Mock data & types
│   ├── lib/                       # Utilities and helpers
│   ├── components.json            # shadcn/ui configuration
│   ├── next.config.mjs            # Next.js configuration
│   ├── package.json               # Dependencies
│   ├── postcss.config.mjs         # PostCSS configuration
│   └── tsconfig.json              # TypeScript configuration
├── CODE_OF_CONDUCT.md            # Community guidelines
├── CONTRIBUTING.md               # Contribution guidelines
├── LICENSE                       # MIT License
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18 or later
- **pnpm** 12.3 or later (or npm/yarn)
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/mmabiaa/urcampusfellowship.git

# Navigate to the project directory
cd urcampusfellowship/src

# Install dependencies
pnpm install
# or
npm install

# Run the development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

```bash
pnpm dev        # Start development server on http://localhost:3000
pnpm build      # Build for production
pnpm start      # Start production server
```

---

## 🎨 Design System

UrCampusFellowship features a custom design system with:

### Color Palette
- **Ink** (#20231f) - Primary text and borders
- **Paper** (#f5f2ea) - Background
- **Cream** (#fffdf7) - Card backgrounds
- **Moss** (#3f4a36) - Primary actions
- **Sage** (#dfe5d7) - Accent backgrounds
- **Clay** (#a56f59) - Secondary accents
- **Gold** (#e8c878) - Highlights
- **Butter** (#f2e3ba) - CTA backgrounds

### Typography
- **Headings**: Georgia (serif) for warmth and readability
- **Body**: System font stack for optimal performance
- Letter spacing optimized for readability (-0.01em to -0.04em)

### Components
- Custom buttons with shadow effects and hover states
- Cards with subtle shadows and border styling
- Responsive navigation with mobile hamburger menu
- Accessible form inputs with focus states
- Status badges for chapter states (active, draft, coming soon)

---

## 📄 Page Overview

### Public Pages
- **Landing** (`/`) - Hero section with platform overview
- **About** (`/about`) - Mission, vision, and platform benefits
- **How It Works** (`/how-it-works`) - Step-by-step guide for all users
- **For Leaders** (`/for-leaders`) - Information for chapter heads
- **Terms** (`/terms`) - Terms of Service
- **Privacy** (`/privacy`) - Privacy Policy

### Student Flow
- **Directory** (`/student`) - Browse fellowships by campus
- **Chapter Details** (`/student/chapter`) - View chapter information
- **Register** (`/student/register`) - Join a fellowship
- **Success** (`/student/success`) - Registration confirmation

### Chapter Head Dashboard
- **Overview** (`/heads`) - Dashboard with statistics
- **Setup** (`/heads/setup`) - Configure chapter details
- **Roster** (`/heads/roster`) - Manage members

### Admin Dashboard
- **Overview** (`/admin`) - Platform-wide statistics
- **Chapters** (`/admin/chapter`) - Manage all chapters
- **Denominations** (`/admin/denominations`) - Manage denominations

---

## 🔐 User Roles

### Student
- Browse fellowship directory
- View chapter details
- Register with one fellowship
- Manage profile and membership
- Access WhatsApp groups

### Chapter Head
- Set up and edit chapter information
- View registered members
- Manage roster (flag/remove members)
- Access only their own chapter data

### System Administrator
- Add/edit denominations
- Add/edit campuses
- Create chapter head accounts
- View platform-wide statistics
- No access to individual student data

---

## 🚧 Project Status

- ✅ **Requirements** - Complete
- ✅ **System Design** - Complete
- ✅ **UI/UX Design** - Complete
- ✅ **Frontend Implementation** - Complete
- ✅ **Component Library** - Complete
- ✅ **Public Pages** - Complete (About, How It Works, For Leaders, Terms, Privacy)
- 🚧 **Backend Integration** - In Progress
- 📋 **Authentication** - Planned
- 📋 **Database Schema** - Planned
- 📋 **API Development** - Planned
- 📋 **Testing** - Planned
- 📋 **Deployment** - Planned

---

## 🤝 Contributing

We welcome contributions from developers, designers, and community members! Here's how you can help:

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- 🔧 Submit pull requests

Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🎓 For Students & Fellowship Leaders

### Students
If you're part of a fellowship on campus and want to be one of the first to join when we launch, reach out! We're looking for early adopters to test the platform and provide feedback.

### Fellowship Leaders
Interested in managing your chapter through UrCampusFellowship? We'd love to hear from you. Get in touch to learn more about how the platform can help you reach and manage your community.

---

## 📞 Contact & Support

For questions, suggestions, or partnership inquiries:

- **Email**: [mmaabiaa@gmail.com](mailto:mmaabiaa@gmail.com)
- **GitHub**: [@mmabiaa](https://github.com/mmabiaa)
- **Issues**: [GitHub Issues](https://github.com/mmabiaa/urcampusfellowship/issues)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ for campus communities in Ghana.

Special thanks to:
- All fellowship leaders working tirelessly to build campus communities
- Students who provided feedback and insights
- Open source contributors and the Next.js community
- Everyone helping make fellowship discovery easier

---

## 🌟 Future Plans

- Email verification system
- Real-time roster updates
- Push notifications for announcements
- Mobile app (React Native)
- Multi-university expansion
- Analytics dashboard for leaders
- Event management features
- Resource sharing capabilities

---

**Made with purpose for campus ministry in Ghana.**

© 2026 UrCampusFellowship. All rights reserved.
