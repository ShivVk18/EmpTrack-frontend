import React, { useEffect, useState } from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  Menu, 
  ChevronDown, 
  Clock, 
  MapPin, 
  User, 
  KeyRound, 
  LogOut,
  UserCheck,
  UserX,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/utils/axiosInstance';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

export function Topbar({ 
  onMenuToggle, 
  config,
  searchPlaceholder = "Search...",
  actionButton,
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [loading, setLoading] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false); // Track clock-in status
  
  const token = useAuthStore((state) => state.token);
  const { user, userType } = useAuthStore.getState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  function getFormattedTime() {
    return new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  const getGradientColors = () => {
    switch (config.variant) {
      case 'employee':
        return 'from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 shadow-amber-400/25 hover:shadow-amber-400/30';
      case 'manager':
        return 'from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 shadow-amber-500/25 hover:shadow-amber-500/30';
      default:
        return 'from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 shadow-amber-700/25 hover:shadow-amber-700/30';
    }
  };

  const showBackButton = (() => {
    const segments = location.pathname.split('/').filter(Boolean);
    // Show back button when deeper than top-level dashboard (e.g. /admin/dashboard/... or /employee/dashboard/...)
    if (segments.length <= 2) return false;
    return segments[1] === 'admin' || segments[1] === 'employee';
  })();

  // Toggle Clock In/Out Handler
  const handleClockToggle = async () => {
    try {
      setLoading(true);
      const endpoint = isClockedIn ? "/attendance/clockout" : "/attendance/clockin";
      const res = await api.post(endpoint);
      
      // Handle response message with toast
      if (res.data.success) {
        toast.success(res.data.message, {
          description: new Date().toLocaleTimeString(),
          duration: 3000,
        });
        setIsClockedIn(!isClockedIn); // Toggle the status only on success
      } else {
        // Show error message even when success is false
        toast.error(res.data.message || "Action failed", {
          description: "Please try again",
          duration: 4000,
        });
      }
    } catch (err) {
      // Handle both API error response and network errors
      const errorMessage = err.response?.data?.message || err.message || `${isClockedIn ? "Clock-out" : "Clock-in"} failed`;
      toast.error(errorMessage, {
        description: "Please check your connection and try again",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Check initial clock-in status on component mount
  useEffect(() => {
    const checkClockStatus = async () => {
      try {
        const res = await api.get("/attendance/status");
        setIsClockedIn(res.data.isClockedIn || false);
      } catch (err) {
        console.log("Could not fetch clock status");
      }
    };

    if (userType === "employee") {
      checkClockStatus();
    }
  }, [userType]);

  const signOutClickHandler = async () => {
    const res = await api.post('/auth/logout', {}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (res.data.success) {
      useAuthStore.getState().logout();
      navigate('/');
    }
  };

  return (
    <header className="bg-amber-50/90 backdrop-blur-md border-b border-amber-200/80 shadow-sm shadow-amber-900/5 relative z-40">
      <div className="flex justify-between items-center px-4 lg:px-8 py-6">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="flex items-center space-x-2">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="p-2 h-auto rounded-full"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 text-amber-700" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden p-2 h-auto rounded-full"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-amber-700" />
            </Button>
          </div>

          {/* Time & Location - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-4 xl:space-x-6">
            <div className="text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-amber-900">{currentTime}</span>
              </div>
            </div>
            <div className="hidden md:block text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-amber-800">Admin Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search - Responsive */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 rounded-xl border-amber-200/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/25 bg-white/60 backdrop-blur-sm transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Single Clock In/Out Toggle Button - Only for employees */}
          {userType === "employee" && (
            <>
              {/* Desktop version */}
              <Button
                onClick={handleClockToggle}
                disabled={loading}
                className={`hidden md:flex ${
                  isClockedIn 
                    ? "bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950" 
                    : "bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900"
                } text-white rounded-xl px-4 py-2.5 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-amber-700`}
              >
                {isClockedIn ? (
                  <>
                    <UserX className="w-4 h-4 mr-2" />
                    Clock Out
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Clock In
                  </>
                )}
              </Button>

              {/* Mobile version - compact */}
              <Button
                onClick={handleClockToggle}
                disabled={loading}
                className={`md:hidden p-2 ${
                  isClockedIn 
                    ? "bg-gradient-to-r from-amber-700 to-amber-900" 
                    : "bg-gradient-to-r from-amber-600 to-amber-800"
                } text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
                title={isClockedIn ? "Clock Out" : "Clock In"}
              >
                {isClockedIn ? (
                  <UserX className="w-4 h-4" />
                ) : (
                  <UserCheck className="w-4 h-4" />
                )}
              </Button>
            </>
          )}

          {/* Action Button - Hidden on small screens when employee buttons are shown */}
          {actionButton && (
            <>
              {/* Compact version for small screens */}
              <Button 
                onClick={actionButton.onClick}
                className={`${userType === "employee" ? "hidden" : "sm:hidden"} p-2 bg-gradient-to-r ${getGradientColors()} text-white rounded-xl shadow-md hover:shadow-lg`}
              >
                <Plus className="w-4 h-4" />
              </Button>

              {/* Full version for sm and up */}
              <Button 
                onClick={actionButton.onClick}
                className={`hidden sm:flex bg-gradient-to-r ${getGradientColors()} text-white rounded-xl px-3 lg:px-4 py-2.5 text-sm font-medium shadow-lg hover:shadow-xl`}
              >
                <Plus className="w-4 h-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">{actionButton.label}</span>
                <span className="lg:hidden">Add</span>
              </Button>
            </>
          )}

          {/* User Menu */}
          <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2 lg:px-3 py-2.5 h-auto">
                <div className={`w-7 h-7 bg-gradient-to-r ${getGradientColors().split(' ')[0]} ${getGradientColors().split(' ')[1]} ${getGradientColors().split(' ')[2]} rounded-full flex items-center justify-center shadow-md`}>
                  {config.user.avatar ? (
                    <img src={config.user.avatar} alt={config.user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="hidden sm:block font-medium text-amber-900">{config.user.name.split(' ')[0]}</span>
                <ChevronDown className="w-4 h-4 text-amber-500" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-48 bg-amber-50/95 backdrop-blur-sm border-amber-200/80 rounded-xl shadow-lg shadow-amber-900/10">
              <DropdownMenuItem className="flex items-center space-x-3 p-3 cursor-pointer">
                <User className="w-4 h-4 text-amber-600" />
                <span className="text-amber-900">My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-3 p-3 cursor-pointer">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span className="text-amber-900">Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-amber-100" />
              <DropdownMenuItem className="flex items-center space-x-3 p-3 text-red-600 cursor-pointer">
                <LogOut className="w-4 h-4" />
                <Button variant='ghost' onClick={signOutClickHandler} className="p-0 h-auto text-red-600 hover:text-red-700 hover:bg-transparent -ml-2">
                  <span>Sign Out</span>
                </Button> 
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}