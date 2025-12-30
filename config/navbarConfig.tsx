"use client";
import { NavbarConfig, NavItem, NavSection } from "@/types/navbar";

import {
  Activity,
  Server,
  Lock,
  Home,
  Bell,
  Cloud,
  Terminal,
  Database,
  Zap,
  Globe,
  Folder,
  FileCode,
  Cpu,
  Layers,
  GitBranch,
  Bug,
  Users,
  Shield,
  Key,
  Settings,
  Cog,
  Palette,
  Wrench,
  Box,
  ChartLine,
  User,
  Code,
  MessageSquare,
  Calendar,
  Mail,
  Image,
  Video,
  Music,
  Download,
  Upload,
  Search,
  Filter,
  Star,
  Heart,
  Bookmark,
  Share2,
  Link,
  ExternalLink,
  Archive,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Copy,
  Clipboard,
  Check,
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  HelpCircle,
  BarChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Package,
  Truck,
  MapPin,
  Navigation,
  Compass,
  Map,
  Clock,
  Timer,
  Repeat,
  RefreshCw,
  RotateCw,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Wifi,
  WifiOff,
  Bluetooth,
  Battery,
  BatteryCharging,
  Power,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Wind,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown,
  Award,
  Trophy,
  Target,
  Crosshair,
  Aperture,
  Camera,
  Film,
  Mic,
  Volume2,
  Headphones,
  Radio,
  Tv,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  HardDrive,
  Printer,
  Rss,
  Hash,
  AtSign,
  Send,
  Paperclip,
  Scissors,
  Feather,
  PenTool,
  Highlighter,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Columns,
  Grid,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  Maximize,
  Minimize,
  Move,
  Grip,
  MoreHorizontal,
  MoreVertical,
  Menu,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CornerDownRight,
  LogIn,
  LogOut,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Briefcase,
  Building,
  Factory,
  Landmark,
  Store,
  ShoppingBag,
  Gift,
  Percent,
  Receipt,
  Wallet,
  PiggyBank,
  Coins,
  Banknote,
  Scale,
  Gavel,
  FileText,
  File,
  FilePlus,
  FileMinus,
  FileCheck,
  FileX,
  FolderPlus,
  FolderMinus,
  FolderOpen,
  Inbox,
  Save,
  Undo,
  Redo,
  RotateCcw,
  History,
  Bookmark as BookmarkIcon,
  Tag,
  Tags,
  Flag,
  Anchor,
  Umbrella,
  Coffee,
  Utensils,
  Sparkles,
  Flame,
  Lightbulb,
  Rocket,
  Plane,
  Car,
  Bus,
  Train,
  Ship,
  Bike,
  Footprints,
  PersonStanding,
  Baby,
  Dog,
  Cat,
  Bird,
  Fish,
  Flower,
  Leaf,
  TreePine,
  Mountain,
  Sunrise,
  Sunset,
  Waves,
  Earth,
} from "lucide-react";

export const navItems: NavbarConfig = [
  {
    section: "Administration",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: <Settings className="h-4 w-4" />,
        children: [
          {
            label: "Appearance",
            href: "/settings/appearance",
            icon: <Palette className="h-4 w-4" />,
          },
          {
            label: "Account",
            href: "/settings/account",
            icon: <User className="h-4 w-4" />,
          },
          {
            label: "Api keys",
            href: "/settings/api-keys",
            icon: <Key className="h-4 w-4" />,
          },
        ],
      },
    ],
  },
];

// if you add role USER it will be hidden for admins
// export const navItems: NavbarConfig = [
//   {
//     section: "Overview",
//     items: [
//       {
//         label: "Dashboard",
//         icon: <Home className="h-4 w-4" />,
//         href: "/dashboard",
//         subtitle: "System summary and quick insights",
//         badge: "new",
//       },
//       {
//         label: "Activity Feed",
//         icon: <Activity className="h-4 w-4" />,
//         href: "/activity",
//         subtitle: "Real-time system events",
//         badge: "live",
//       },
//       {
//         label: "Notifications",
//         icon: <Bell className="h-4 w-4" />,
//         href: "/notifications",
//         badge: "24",
//         children: [
//           {
//             label: "All Notifications",
//             icon: <Inbox className="h-4 w-4" />,
//             href: "/notifications/all",
//           },
//           {
//             label: "Mentions",
//             icon: <AtSign className="h-4 w-4" />,
//             href: "/notifications/mentions",
//             badge: "5",
//           },
//           {
//             label: "System Alerts",
//             icon: <AlertCircle className="h-4 w-4" />,
//             href: "/notifications/system",
//             badge: "3",
//           },
//           {
//             label: "Updates",
//             icon: <RefreshCw className="h-4 w-4" />,
//             href: "/notifications/updates",
//           },
//         ],
//       },
//       {
//         label: "Quick Actions",
//         icon: <Zap className="h-4 w-4" />,
//         href: "/quick-actions",
//         subtitle: "Frequently used operations",
//       },
//       {
//         label: "Search",
//         icon: <Search className="h-4 w-4" />,
//         href: "/search",
//         subtitle: "Find anything in the system",
//       },
//     ],
//   },
//   {
//     section: "Infrastructure",
//     items: [
//       {
//         label: "Servers",
//         icon: <Server className="h-4 w-4" />,
//         href: "/servers",
//         subtitle: "Deployed instances and VMs",
//         badge: "12 active",
//         children: [
//           {
//             label: "Production",
//             icon: <Cloud className="h-4 w-4" />,
//             href: "/servers/production",
//             badge: "4",
//           },
//           {
//             label: "Staging",
//             icon: <Cloud className="h-4 w-4" />,
//             href: "/servers/staging",
//             badge: "3",
//           },
//           {
//             label: "Development",
//             icon: <Terminal className="h-4 w-4" />,
//             href: "/servers/development",
//             badge: "2",
//           },
//           {
//             label: "Testing",
//             icon: <Bug className="h-4 w-4" />,
//             href: "/servers/testing",
//             badge: "3",
//           },
//           {
//             label: "Backups",
//             icon: <Archive className="h-4 w-4" />,
//             href: "/servers/backups",
//           },
//         ],
//       },
//       {
//         label: "Databases",
//         icon: <Database className="h-4 w-4" />,
//         href: "/databases",
//         subtitle: "Managed data stores",
//         children: [
//           {
//             label: "PostgreSQL",
//             icon: <Database className="h-4 w-4" />,
//             href: "/databases/postgres",
//             badge: "primary",
//           },
//           {
//             label: "MySQL",
//             icon: <Database className="h-4 w-4" />,
//             href: "/databases/mysql",
//           },
//           {
//             label: "MongoDB",
//             icon: <Database className="h-4 w-4" />,
//             href: "/databases/mongodb",
//           },
//           {
//             label: "Redis Cache",
//             icon: <Zap className="h-4 w-4" />,
//             href: "/databases/redis",
//             badge: "cache",
//           },
//           {
//             label: "Elasticsearch",
//             icon: <Search className="h-4 w-4" />,
//             href: "/databases/elasticsearch",
//           },
//           {
//             label: "Backups & Snapshots",
//             icon: <Save className="h-4 w-4" />,
//             href: "/databases/backups",
//           },
//         ],
//       },
//       {
//         label: "Networking",
//         icon: <Globe className="h-4 w-4" />,
//         href: "/networking",
//         subtitle: "Network configuration",
//         children: [
//           {
//             label: "Load Balancers",
//             icon: <Layers className="h-4 w-4" />,
//             href: "/networking/load-balancers",
//           },
//           {
//             label: "DNS Management",
//             icon: <Globe className="h-4 w-4" />,
//             href: "/networking/dns",
//           },
//           {
//             label: "SSL Certificates",
//             icon: <Lock className="h-4 w-4" />,
//             href: "/networking/ssl",
//             badge: "2 expiring",
//           },
//           {
//             label: "Firewalls",
//             icon: <Shield className="h-4 w-4" />,
//             href: "/networking/firewalls",
//           },
//           {
//             label: "VPN",
//             icon: <Wifi className="h-4 w-4" />,
//             href: "/networking/vpn",
//           },
//           {
//             label: "CDN",
//             icon: <Globe className="h-4 w-4" />,
//             href: "/networking/cdn",
//           },
//         ],
//       },
//       {
//         label: "Storage",
//         icon: <HardDrive className="h-4 w-4" />,
//         href: "/storage",
//         subtitle: "File and object storage",
//         children: [
//           {
//             label: "Object Storage",
//             icon: <Box className="h-4 w-4" />,
//             href: "/storage/objects",
//             badge: "2.4 TB",
//           },
//           {
//             label: "Block Storage",
//             icon: <HardDrive className="h-4 w-4" />,
//             href: "/storage/block",
//           },
//           {
//             label: "File Systems",
//             icon: <Folder className="h-4 w-4" />,
//             href: "/storage/filesystems",
//           },
//           {
//             label: "Backups",
//             icon: <Archive className="h-4 w-4" />,
//             href: "/storage/backups",
//           },
//         ],
//       },
//       {
//         label: "Containers",
//         icon: <Box className="h-4 w-4" />,
//         href: "/containers",
//         subtitle: "Docker & Kubernetes",
//         badge: "running",
//         children: [
//           {
//             label: "Kubernetes Clusters",
//             icon: <Layers className="h-4 w-4" />,
//             href: "/containers/kubernetes",
//           },
//           {
//             label: "Docker Images",
//             icon: <Box className="h-4 w-4" />,
//             href: "/containers/images",
//           },
//           {
//             label: "Registries",
//             icon: <Archive className="h-4 w-4" />,
//             href: "/containers/registries",
//           },
//           {
//             label: "Deployments",
//             icon: <Rocket className="h-4 w-4" />,
//             href: "/containers/deployments",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "Development",
//     items: [
//       {
//         label: "Projects",
//         icon: <Folder className="h-4 w-4" />,
//         href: "/projects",
//         subtitle: "Source code repositories",
//         badge: "28",
//         children: [
//           {
//             label: "All Projects",
//             icon: <Grid className="h-4 w-4" />,
//             href: "/projects/all",
//           },
//           {
//             label: "Frontend Apps",
//             icon: <Layout className="h-4 w-4" />,
//             href: "/projects/frontend",
//             badge: "12",
//           },
//           {
//             label: "Backend Services",
//             icon: <Cpu className="h-4 w-4" />,
//             href: "/projects/backend",
//             badge: "8",
//           },
//           {
//             label: "Libraries",
//             icon: <Package className="h-4 w-4" />,
//             href: "/projects/libraries",
//             badge: "5",
//           },
//           {
//             label: "Infrastructure",
//             icon: <Layers className="h-4 w-4" />,
//             href: "/projects/infrastructure",
//             badge: "3",
//           },
//           {
//             label: "Templates",
//             icon: <FileCode className="h-4 w-4" />,
//             href: "/projects/templates",
//           },
//           {
//             label: "Archived",
//             icon: <Archive className="h-4 w-4" />,
//             href: "/projects/archived",
//           },
//         ],
//       },
//       {
//         label: "CI/CD Pipelines",
//         icon: <GitBranch className="h-4 w-4" />,
//         href: "/pipelines",
//         badge: "5 running",
//         subtitle: "Build and deployment",
//         children: [
//           {
//             label: "All Pipelines",
//             icon: <List className="h-4 w-4" />,
//             href: "/pipelines/all",
//           },
//           {
//             label: "Running",
//             icon: <Play className="h-4 w-4" />,
//             href: "/pipelines/running",
//             badge: "5",
//           },
//           {
//             label: "Queued",
//             icon: <Clock className="h-4 w-4" />,
//             href: "/pipelines/queued",
//             badge: "3",
//           },
//           {
//             label: "Failed",
//             icon: <X className="h-4 w-4" />,
//             href: "/pipelines/failed",
//             badge: "2",
//           },
//           {
//             label: "History",
//             icon: <History className="h-4 w-4" />,
//             href: "/pipelines/history",
//           },
//           {
//             label: "Schedules",
//             icon: <Calendar className="h-4 w-4" />,
//             href: "/pipelines/schedules",
//           },
//         ],
//       },
//       {
//         label: "Code Quality",
//         icon: <Check className="h-4 w-4" />,
//         href: "/quality",
//         subtitle: "Testing & analysis",
//         children: [
//           {
//             label: "Test Results",
//             icon: <FileCheck className="h-4 w-4" />,
//             href: "/quality/tests",
//             badge: "98%",
//           },
//           {
//             label: "Code Coverage",
//             icon: <PieChart className="h-4 w-4" />,
//             href: "/quality/coverage",
//             badge: "87%",
//           },
//           {
//             label: "Linting",
//             icon: <AlertTriangle className="h-4 w-4" />,
//             href: "/quality/linting",
//             badge: "12",
//           },
//           {
//             label: "Security Scan",
//             icon: <Shield className="h-4 w-4" />,
//             href: "/quality/security",
//           },
//           {
//             label: "Dependencies",
//             icon: <Package className="h-4 w-4" />,
//             href: "/quality/dependencies",
//             badge: "4 outdated",
//           },
//         ],
//       },
//       {
//         label: "Logs & Monitoring",
//         icon: <Terminal className="h-4 w-4" />,
//         href: "/logs",
//         subtitle: "Application logs",
//         children: [
//           {
//             label: "Live Logs",
//             icon: <Activity className="h-4 w-4" />,
//             href: "/logs/live",
//             badge: "live",
//           },
//           {
//             label: "Log Explorer",
//             icon: <Search className="h-4 w-4" />,
//             href: "/logs/explorer",
//           },
//           {
//             label: "Error Tracking",
//             icon: <Bug className="h-4 w-4" />,
//             href: "/logs/errors",
//             badge: "7",
//           },
//           {
//             label: "Metrics",
//             icon: <BarChart className="h-4 w-4" />,
//             href: "/logs/metrics",
//           },
//           {
//             label: "Traces",
//             icon: <Crosshair className="h-4 w-4" />,
//             href: "/logs/traces",
//           },
//           {
//             label: "Alerts",
//             icon: <AlertCircle className="h-4 w-4" />,
//             href: "/logs/alerts",
//             badge: "3 active",
//           },
//         ],
//       },
//       {
//         label: "API Gateway",
//         icon: <Code className="h-4 w-4" />,
//         href: "/api-gateway",
//         subtitle: "API management",
//         children: [
//           {
//             label: "Endpoints",
//             icon: <Link className="h-4 w-4" />,
//             href: "/api-gateway/endpoints",
//           },
//           {
//             label: "Rate Limiting",
//             icon: <Timer className="h-4 w-4" />,
//             href: "/api-gateway/rate-limits",
//           },
//           {
//             label: "Documentation",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/api-gateway/docs",
//           },
//           {
//             label: "Analytics",
//             icon: <BarChart className="h-4 w-4" />,
//             href: "/api-gateway/analytics",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "Analytics",
//     items: [
//       {
//         label: "Dashboard",
//         icon: <BarChart className="h-4 w-4" />,
//         href: "/analytics",
//         subtitle: "Key performance indicators",
//         badge: "updated",
//         children: [
//           {
//             label: "Overview",
//             icon: <PieChart className="h-4 w-4" />,
//             href: "/analytics/overview",
//           },
//           {
//             label: "Real-time",
//             icon: <Activity className="h-4 w-4" />,
//             href: "/analytics/realtime",
//             badge: "live",
//           },
//           {
//             label: "Custom Reports",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/analytics/custom",
//           },
//         ],
//       },
//       {
//         label: "Traffic",
//         icon: <TrendingUp className="h-4 w-4" />,
//         href: "/analytics/traffic",
//         subtitle: "User visits and sessions",
//         children: [
//           {
//             label: "Page Views",
//             icon: <Eye className="h-4 w-4" />,
//             href: "/analytics/traffic/pageviews",
//           },
//           {
//             label: "User Sessions",
//             icon: <Users className="h-4 w-4" />,
//             href: "/analytics/traffic/sessions",
//           },
//           {
//             label: "Geography",
//             icon: <Globe className="h-4 w-4" />,
//             href: "/analytics/traffic/geo",
//           },
//           {
//             label: "Devices",
//             icon: <Smartphone className="h-4 w-4" />,
//             href: "/analytics/traffic/devices",
//           },
//           {
//             label: "Referrers",
//             icon: <ExternalLink className="h-4 w-4" />,
//             href: "/analytics/traffic/referrers",
//           },
//         ],
//       },
//       {
//         label: "Performance",
//         icon: <Zap className="h-4 w-4" />,
//         href: "/analytics/performance",
//         subtitle: "Speed and reliability",
//         children: [
//           {
//             label: "Response Times",
//             icon: <Timer className="h-4 w-4" />,
//             href: "/analytics/performance/response-times",
//           },
//           {
//             label: "Error Rates",
//             icon: <AlertTriangle className="h-4 w-4" />,
//             href: "/analytics/performance/errors",
//           },
//           {
//             label: "Uptime",
//             icon: <Check className="h-4 w-4" />,
//             href: "/analytics/performance/uptime",
//             badge: "99.9%",
//           },
//           {
//             label: "Apdex Score",
//             icon: <Target className="h-4 w-4" />,
//             href: "/analytics/performance/apdex",
//           },
//         ],
//       },
//       {
//         label: "Business Metrics",
//         icon: <DollarSign className="h-4 w-4" />,
//         href: "/analytics/business",
//         subtitle: "Revenue and conversions",
//         children: [
//           {
//             label: "Revenue",
//             icon: <Banknote className="h-4 w-4" />,
//             href: "/analytics/business/revenue",
//             badge: "+12%",
//           },
//           {
//             label: "Conversions",
//             icon: <TrendingUp className="h-4 w-4" />,
//             href: "/analytics/business/conversions",
//           },
//           {
//             label: "Churn Rate",
//             icon: <TrendingDown className="h-4 w-4" />,
//             href: "/analytics/business/churn",
//           },
//           {
//             label: "LTV",
//             icon: <Heart className="h-4 w-4" />,
//             href: "/analytics/business/ltv",
//           },
//         ],
//       },
//       {
//         label: "Reports",
//         icon: <ChartLine className="h-4 w-4" />,
//         href: "/reports",
//         subtitle: "Scheduled reports",
//         children: [
//           {
//             label: "Weekly Summary",
//             icon: <Calendar className="h-4 w-4" />,
//             href: "/reports/weekly",
//           },
//           {
//             label: "Monthly Report",
//             icon: <Calendar className="h-4 w-4" />,
//             href: "/reports/monthly",
//           },
//           {
//             label: "Custom Reports",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/reports/custom",
//           },
//           {
//             label: "Export Data",
//             icon: <Download className="h-4 w-4" />,
//             href: "/reports/export",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "Communication",
//     items: [
//       {
//         label: "Messages",
//         icon: <MessageSquare className="h-4 w-4" />,
//         href: "/messages",
//         badge: "8 unread",
//         subtitle: "Team chat and DMs",
//         children: [
//           {
//             label: "Inbox",
//             icon: <Inbox className="h-4 w-4" />,
//             href: "/messages/inbox",
//             badge: "8",
//           },
//           {
//             label: "Sent",
//             icon: <Send className="h-4 w-4" />,
//             href: "/messages/sent",
//           },
//           {
//             label: "Drafts",
//             icon: <Edit className="h-4 w-4" />,
//             href: "/messages/drafts",
//             badge: "2",
//           },
//           {
//             label: "Starred",
//             icon: <Star className="h-4 w-4" />,
//             href: "/messages/starred",
//           },
//           {
//             label: "Archived",
//             icon: <Archive className="h-4 w-4" />,
//             href: "/messages/archived",
//           },
//           {
//             label: "Trash",
//             icon: <Trash2 className="h-4 w-4" />,
//             href: "/messages/trash",
//           },
//         ],
//       },
//       {
//         label: "Email",
//         icon: <Mail className="h-4 w-4" />,
//         href: "/email",
//         subtitle: "Email management",
//         children: [
//           {
//             label: "Templates",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/email/templates",
//           },
//           {
//             label: "Campaigns",
//             icon: <Send className="h-4 w-4" />,
//             href: "/email/campaigns",
//           },
//           {
//             label: "Analytics",
//             icon: <BarChart className="h-4 w-4" />,
//             href: "/email/analytics",
//           },
//           {
//             label: "Subscribers",
//             icon: <Users className="h-4 w-4" />,
//             href: "/email/subscribers",
//           },
//         ],
//       },
//       {
//         label: "Webhooks",
//         icon: <Rss className="h-4 w-4" />,
//         href: "/webhooks",
//         subtitle: "Event notifications",
//         children: [
//           {
//             label: "Endpoints",
//             icon: <Link className="h-4 w-4" />,
//             href: "/webhooks/endpoints",
//           },
//           {
//             label: "Events",
//             icon: <Zap className="h-4 w-4" />,
//             href: "/webhooks/events",
//           },
//           {
//             label: "Delivery Logs",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/webhooks/logs",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "Content",
//     items: [
//       {
//         label: "Media Library",
//         icon: <Image className="h-4 w-4" />,
//         href: "/media",
//         subtitle: "Images, videos, and files",
//         badge: "1.2K files",
//         children: [
//           {
//             label: "Images",
//             icon: <Image className="h-4 w-4" />,
//             href: "/media/images",
//             badge: "842",
//           },
//           {
//             label: "Videos",
//             icon: <Video className="h-4 w-4" />,
//             href: "/media/videos",
//             badge: "156",
//           },
//           {
//             label: "Audio",
//             icon: <Music className="h-4 w-4" />,
//             href: "/media/audio",
//             badge: "89",
//           },
//           {
//             label: "Documents",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/media/documents",
//             badge: "234",
//           },
//           {
//             label: "Upload",
//             icon: <Upload className="h-4 w-4" />,
//             href: "/media/upload",
//           },
//         ],
//       },
//       {
//         label: "Pages",
//         icon: <FileText className="h-4 w-4" />,
//         href: "/pages",
//         subtitle: "CMS content pages",
//         children: [
//           {
//             label: "Published",
//             icon: <Check className="h-4 w-4" />,
//             href: "/pages/published",
//           },
//           {
//             label: "Drafts",
//             icon: <Edit className="h-4 w-4" />,
//             href: "/pages/drafts",
//             badge: "5",
//           },
//           {
//             label: "Scheduled",
//             icon: <Calendar className="h-4 w-4" />,
//             href: "/pages/scheduled",
//           },
//           {
//             label: "Templates",
//             icon: <Layout className="h-4 w-4" />,
//             href: "/pages/templates",
//           },
//         ],
//       },
//       {
//         label: "Blog",
//         icon: <PenTool className="h-4 w-4" />,
//         href: "/blog",
//         subtitle: "Blog posts and articles",
//         children: [
//           {
//             label: "All Posts",
//             icon: <List className="h-4 w-4" />,
//             href: "/blog/posts",
//           },
//           {
//             label: "Categories",
//             icon: <Tags className="h-4 w-4" />,
//             href: "/blog/categories",
//           },
//           {
//             label: "Tags",
//             icon: <Tag className="h-4 w-4" />,
//             href: "/blog/tags",
//           },
//           {
//             label: "Comments",
//             icon: <MessageSquare className="h-4 w-4" />,
//             href: "/blog/comments",
//             badge: "12 pending",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "E-Commerce",
//     items: [
//       {
//         label: "Products",
//         icon: <Package className="h-4 w-4" />,
//         href: "/products",
//         subtitle: "Product catalog",
//         badge: "156",
//         children: [
//           {
//             label: "All Products",
//             icon: <Grid className="h-4 w-4" />,
//             href: "/products/all",
//           },
//           {
//             label: "Categories",
//             icon: <Folder className="h-4 w-4" />,
//             href: "/products/categories",
//           },
//           {
//             label: "Inventory",
//             icon: <Box className="h-4 w-4" />,
//             href: "/products/inventory",
//             badge: "5 low",
//           },
//           {
//             label: "Pricing",
//             icon: <DollarSign className="h-4 w-4" />,
//             href: "/products/pricing",
//           },
//           {
//             label: "Reviews",
//             icon: <Star className="h-4 w-4" />,
//             href: "/products/reviews",
//           },
//         ],
//       },
//       {
//         label: "Orders",
//         icon: <ShoppingCart className="h-4 w-4" />,
//         href: "/orders",
//         badge: "23 new",
//         subtitle: "Customer orders",
//         children: [
//           {
//             label: "All Orders",
//             icon: <List className="h-4 w-4" />,
//             href: "/orders/all",
//           },
//           {
//             label: "Pending",
//             icon: <Clock className="h-4 w-4" />,
//             href: "/orders/pending",
//             badge: "15",
//           },
//           {
//             label: "Processing",
//             icon: <RefreshCw className="h-4 w-4" />,
//             href: "/orders/processing",
//             badge: "8",
//           },
//           {
//             label: "Shipped",
//             icon: <Truck className="h-4 w-4" />,
//             href: "/orders/shipped",
//           },
//           {
//             label: "Delivered",
//             icon: <Check className="h-4 w-4" />,
//             href: "/orders/delivered",
//           },
//           {
//             label: "Returns",
//             icon: <RotateCcw className="h-4 w-4" />,
//             href: "/orders/returns",
//             badge: "3",
//           },
//         ],
//       },
//       {
//         label: "Customers",
//         icon: <Users className="h-4 w-4" />,
//         href: "/customers",
//         subtitle: "Customer management",
//         children: [
//           {
//             label: "All Customers",
//             icon: <Users className="h-4 w-4" />,
//             href: "/customers/all",
//           },
//           {
//             label: "Segments",
//             icon: <Filter className="h-4 w-4" />,
//             href: "/customers/segments",
//           },
//           {
//             label: "VIP",
//             icon: <Award className="h-4 w-4" />,
//             href: "/customers/vip",
//           },
//           {
//             label: "Reviews",
//             icon: <MessageSquare className="h-4 w-4" />,
//             href: "/customers/reviews",
//           },
//         ],
//       },
//       {
//         label: "Payments",
//         icon: <CreditCard className="h-4 w-4" />,
//         href: "/payments",
//         subtitle: "Payment processing",
//         children: [
//           {
//             label: "Transactions",
//             icon: <Receipt className="h-4 w-4" />,
//             href: "/payments/transactions",
//           },
//           {
//             label: "Invoices",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/payments/invoices",
//           },
//           {
//             label: "Subscriptions",
//             icon: <Repeat className="h-4 w-4" />,
//             href: "/payments/subscriptions",
//           },
//           {
//             label: "Refunds",
//             icon: <RotateCcw className="h-4 w-4" />,
//             href: "/payments/refunds",
//           },
//           {
//             label: "Payouts",
//             icon: <Wallet className="h-4 w-4" />,
//             href: "/payments/payouts",
//           },
//         ],
//       },
//       {
//         label: "Shipping",
//         icon: <Truck className="h-4 w-4" />,
//         href: "/shipping",
//         subtitle: "Delivery management",
//         children: [
//           {
//             label: "Carriers",
//             icon: <Truck className="h-4 w-4" />,
//             href: "/shipping/carriers",
//           },
//           {
//             label: "Zones",
//             icon: <MapPin className="h-4 w-4" />,
//             href: "/shipping/zones",
//           },
//           {
//             label: "Rates",
//             icon: <DollarSign className="h-4 w-4" />,
//             href: "/shipping/rates",
//           },
//           {
//             label: "Tracking",
//             icon: <Navigation className="h-4 w-4" />,
//             href: "/shipping/tracking",
//           },
//         ],
//       },
//       {
//         label: "Discounts",
//         icon: <Percent className="h-4 w-4" />,
//         href: "/discounts",
//         subtitle: "Coupons and promotions",
//         badge: "5 active",
//         children: [
//           {
//             label: "Coupons",
//             icon: <Percent className="h-4 w-4" />,
//             href: "/discounts/coupons",
//           },
//           {
//             label: "Promotions",
//             icon: <Gift className="h-4 w-4" />,
//             href: "/discounts/promotions",
//           },
//           {
//             label: "Sales",
//             icon: <TrendingDown className="h-4 w-4" />,
//             href: "/discounts/sales",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "Security",
//     items: [
//       {
//         label: "Users",
//         icon: <Users className="h-4 w-4" />,
//         href: "/users",
//         subtitle: "User accounts",
//         badge: "342",
//         children: [
//           {
//             label: "All Users",
//             icon: <Users className="h-4 w-4" />,
//             href: "/users/all",
//           },
//           {
//             label: "Active",
//             icon: <UserCheck className="h-4 w-4" />,
//             href: "/users/active",
//           },
//           {
//             label: "Pending",
//             icon: <Clock className="h-4 w-4" />,
//             href: "/users/pending",
//             badge: "12",
//           },
//           {
//             label: "Suspended",
//             icon: <UserX className="h-4 w-4" />,
//             href: "/users/suspended",
//           },
//           {
//             label: "Invite",
//             icon: <UserPlus className="h-4 w-4" />,
//             href: "/users/invite",
//           },
//         ],
//       },
//       {
//         label: "Teams",
//         icon: <Users className="h-4 w-4" />,
//         href: "/teams",
//         subtitle: "Team management",
//         children: [
//           {
//             label: "All Teams",
//             icon: <Users className="h-4 w-4" />,
//             href: "/teams/all",
//           },
//           {
//             label: "Create Team",
//             icon: <UserPlus className="h-4 w-4" />,
//             href: "/teams/create",
//           },
//           {
//             label: "Permissions",
//             icon: <Shield className="h-4 w-4" />,
//             href: "/teams/permissions",
//           },
//         ],
//       },
//       {
//         label: "Roles & Permissions",
//         icon: <Shield className="h-4 w-4" />,
//         href: "/roles",
//         subtitle: "Access control",
//         children: [
//           {
//             label: "Roles",
//             icon: <Shield className="h-4 w-4" />,
//             href: "/roles/list",
//           },
//           {
//             label: "Permissions",
//             icon: <Key className="h-4 w-4" />,
//             href: "/roles/permissions",
//           },
//           {
//             label: "Policies",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/roles/policies",
//           },
//         ],
//       },
//       {
//         label: "API Keys",
//         icon: <Key className="h-4 w-4" />,
//         href: "/api-keys",
//         subtitle: "Manage access tokens",
//         children: [
//           {
//             label: "All Keys",
//             icon: <Key className="h-4 w-4" />,
//             href: "/api-keys/all",
//           },
//           {
//             label: "Create Key",
//             icon: <FilePlus className="h-4 w-4" />,
//             href: "/api-keys/create",
//           },
//           {
//             label: "Scopes",
//             icon: <Shield className="h-4 w-4" />,
//             href: "/api-keys/scopes",
//           },
//           {
//             label: "Usage",
//             icon: <BarChart className="h-4 w-4" />,
//             href: "/api-keys/usage",
//           },
//         ],
//       },
//       {
//         label: "Audit Logs",
//         icon: <FileText className="h-4 w-4" />,
//         href: "/audit",
//         subtitle: "Activity history",
//         children: [
//           {
//             label: "All Activity",
//             icon: <Activity className="h-4 w-4" />,
//             href: "/audit/all",
//           },
//           {
//             label: "Login History",
//             icon: <LogIn className="h-4 w-4" />,
//             href: "/audit/logins",
//           },
//           {
//             label: "API Requests",
//             icon: <Code className="h-4 w-4" />,
//             href: "/audit/api",
//           },
//           {
//             label: "Data Changes",
//             icon: <Edit className="h-4 w-4" />,
//             href: "/audit/changes",
//           },
//           {
//             label: "Security Events",
//             icon: <Shield className="h-4 w-4" />,
//             href: "/audit/security",
//             badge: "2",
//           },
//         ],
//       },
//       {
//         label: "Security Center",
//         icon: <Lock className="h-4 w-4" />,
//         href: "/security",
//         subtitle: "Security settings",
//         role: "ADMIN",
//         children: [
//           {
//             label: "Overview",
//             icon: <Shield className="h-4 w-4" />,
//             href: "/security/overview",
//           },
//           {
//             label: "Vulnerabilities",
//             icon: <AlertTriangle className="h-4 w-4" />,
//             href: "/security/vulnerabilities",
//             badge: "1",
//           },
//           {
//             label: "Compliance",
//             icon: <Check className="h-4 w-4" />,
//             href: "/security/compliance",
//           },
//           {
//             label: "Threat Detection",
//             icon: <Crosshair className="h-4 w-4" />,
//             href: "/security/threats",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "Administration",
//     items: [
//       {
//         label: "Settings",
//         icon: <Settings className="h-4 w-4" />,
//         href: "/settings",
//         subtitle: "System configuration",
//         children: [
//           {
//             label: "General",
//             icon: <Cog className="h-4 w-4" />,
//             href: "/settings/general",
//           },
//           {
//             label: "Appearance",
//             icon: <Palette className="h-4 w-4" />,
//             href: "/settings/appearance",
//           },
//           {
//             label: "Account",
//             icon: <User className="h-4 w-4" />,
//             href: "/settings/account",
//           },
//           {
//             label: "Notifications",
//             icon: <Bell className="h-4 w-4" />,
//             href: "/settings/notifications",
//           },
//           {
//             label: "Privacy",
//             icon: <EyeOff className="h-4 w-4" />,
//             href: "/settings/privacy",
//           },
//           {
//             label: "Billing",
//             icon: <CreditCard className="h-4 w-4" />,
//             href: "/settings/billing",
//           },
//           {
//             label: "API Keys",
//             icon: <Key className="h-4 w-4" />,
//             href: "/settings/api-keys",
//           },
//           {
//             label: "Integrations",
//             icon: <Box className="h-4 w-4" />,
//             href: "/settings/integrations",
//           },
//           {
//             label: "System",
//             icon: <Wrench className="h-4 w-4" />,
//             href: "/settings/system",
//             role: "ADMIN",
//           },
//         ],
//       },
//       {
//         label: "Integrations",
//         icon: <Box className="h-4 w-4" />,
//         href: "/integrations",
//         subtitle: "Third-party connections",
//         children: [
//           {
//             label: "All Integrations",
//             icon: <Grid className="h-4 w-4" />,
//             href: "/integrations/all",
//           },
//           {
//             label: "Installed",
//             icon: <Check className="h-4 w-4" />,
//             href: "/integrations/installed",
//             badge: "12",
//           },
//           {
//             label: "Marketplace",
//             icon: <Store className="h-4 w-4" />,
//             href: "/integrations/marketplace",
//           },
//           {
//             label: "Custom",
//             icon: <Code className="h-4 w-4" />,
//             href: "/integrations/custom",
//           },
//         ],
//       },
//       {
//         label: "Billing",
//         icon: <CreditCard className="h-4 w-4" />,
//         href: "/billing",
//         subtitle: "Subscription and payments",
//         children: [
//           {
//             label: "Overview",
//             icon: <Wallet className="h-4 w-4" />,
//             href: "/billing/overview",
//           },
//           {
//             label: "Plans",
//             icon: <Layers className="h-4 w-4" />,
//             href: "/billing/plans",
//           },
//           {
//             label: "Invoices",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/billing/invoices",
//           },
//           {
//             label: "Payment Methods",
//             icon: <CreditCard className="h-4 w-4" />,
//             href: "/billing/methods",
//           },
//           {
//             label: "Usage",
//             icon: <BarChart className="h-4 w-4" />,
//             href: "/billing/usage",
//           },
//         ],
//       },
//       {
//         label: "System Status",
//         icon: <Activity className="h-4 w-4" />,
//         href: "/status",
//         subtitle: "Health and performance",
//         badge: "healthy",
//         children: [
//           {
//             label: "Overview",
//             icon: <Monitor className="h-4 w-4" />,
//             href: "/status/overview",
//           },
//           {
//             label: "Incidents",
//             icon: <AlertCircle className="h-4 w-4" />,
//             href: "/status/incidents",
//           },
//           {
//             label: "Maintenance",
//             icon: <Wrench className="h-4 w-4" />,
//             href: "/status/maintenance",
//           },
//           {
//             label: "Uptime",
//             icon: <TrendingUp className="h-4 w-4" />,
//             href: "/status/uptime",
//             badge: "99.9%",
//           },
//         ],
//       },
//       {
//         label: "Help & Support",
//         icon: <HelpCircle className="h-4 w-4" />,
//         href: "/help",
//         subtitle: "Documentation and support",
//         children: [
//           {
//             label: "Documentation",
//             icon: <FileText className="h-4 w-4" />,
//             href: "/help/docs",
//           },
//           {
//             label: "Tutorials",
//             icon: <Video className="h-4 w-4" />,
//             href: "/help/tutorials",
//           },
//           {
//             label: "FAQ",
//             icon: <HelpCircle className="h-4 w-4" />,
//             href: "/help/faq",
//           },
//           {
//             label: "Contact Support",
//             icon: <MessageSquare className="h-4 w-4" />,
//             href: "/help/contact",
//           },
//           {
//             label: "Community",
//             icon: <Users className="h-4 w-4" />,
//             href: "/help/community",
//           },
//           {
//             label: "Changelog",
//             icon: <History className="h-4 w-4" />,
//             href: "/help/changelog",
//           },
//           {
//             label: "API Reference",
//             icon: <Code className="h-4 w-4" />,
//             href: "/help/api",
//           },
//         ],
//       },
//     ],
//   },
// ];

// // function to insert/remove section/item/child

// export function insertSection(section: NavSection, position: number = 0) {
//   navItems.splice(position, 0, section)
// }

// export function insertItem(section: string, item: NavItem) {
//   navItems.find((item) => item.section === section)?.items.push(item)
// }

// export function insertChild(section: string, Item: string, child: NavItem) {
//   navItems.find((item) => item.section === section)?.items.find((item) => item.label == Item)?.children?.push(child)
// }

// export function removeSection(section: string) {
//   navItems.splice(navItems.findIndex((item) => item.section === section), 1)
// }

// export function removeItem(section: string, Item: string) {
//  const items = navItems.find((item) => item.section === section)?.items
//  items?.splice(items.findIndex((item) => item.label === Item), 1)
// }

// export function removeChild(section: string, Item: string, child: string) {
//   const items = navItems.find((item) => item.section === section)?.items
//   const children = items?.find((item) => item.label == Item)?.children
//   children?.splice(children.findIndex((item) => item.label === child), 1)
// }

// export function updateBadge(section: string, Item: string, badge: string) {
//   const items = navItems.find((item) => item.section === section)?.items
//   const target = items?.find((item) => item.label == Item)
//   if (target) target.badge = badge;

// }
