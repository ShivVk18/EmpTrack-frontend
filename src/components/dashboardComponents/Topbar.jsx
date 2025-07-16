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
  LogOut 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/utils/axiosInstance';
import { useNavigate } from 'react-router';





export function Topbar({ 
  onMenuToggle, 
  config,
  
  searchPlaceholder = "Search...",
  actionButton,

  
}) {

  const [userMenuOpen, setUserMenuOpen] = useState(false);
   
   const [currentTime, setCurrentTime] = useState(getFormattedTime());
   
   const token = useAuthStore((state)=>state.token)
    

   const navigate = useNavigate()

   
   
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(getFormattedTime());
  }, 60000); 

  return () => clearInterval(interval); // cleanup
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
        return 'from-emerald-600 via-blue-600 to-teal-600 hover:from-emerald-700 hover:via-blue-700 hover:to-teal-700 shadow-emerald-600/25 hover:shadow-emerald-600/30';
      case 'manager':
        return 'from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 shadow-orange-600/25 hover:shadow-orange-600/30';
      default:
        return 'from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 shadow-indigo-600/25 hover:shadow-indigo-600/30';
    }
  };

   
  const signOutClickHandler = async () => {
     const res = await api.post('/auth/logout',{},{
       headers: {
        "Authorization" : `Bearer ${token}`
       }
     })

     if(res.data.success){
       useAuthStore.getState().logout()
       navigate('/')
     }
  }
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-stone-200/80 shadow-sm shadow-stone-900/5  relative z-40">
      <div className="flex justify-between items-center px-4 lg:px-8 py-6">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden p-2 h-auto"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </Button>

          {/* Time & Location - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-4 xl:space-x-6">
            <div className="text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-slate-900">{currentTime}</span>
              </div>
            </div>
            <div className="hidden md:block text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="text-slate-700">Admin Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search - Responsive */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 rounded-xl border-stone-200/80 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-600/20 bg-white/50 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Action Button - Hidden on small screens */}
          {actionButton && (
  <>
    {/* Compact version for small screens */}
    <Button 
      onClick={actionButton.onClick}
      className={`sm:hidden p-2 bg-gradient-to-r ${getGradientColors()} text-white rounded-xl shadow-md hover:shadow-lg`}
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


          {/* Notifications */}
          

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
                <span className="hidden sm:block font-medium text-slate-700">{config.user.name.split(' ')[0]}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-stone-200/80 rounded-xl">
              <DropdownMenuItem className="flex items-center space-x-3 p-3">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-slate-700">My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-3 p-3">
                <KeyRound className="w-4 h-4 text-slate-600" />
                <span className="text-slate-700">Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-3 p-3 text-red-600" >
                <LogOut className="w-4 h-4" />
               <Button variant='default' onClick={signOutClickHandler}>
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