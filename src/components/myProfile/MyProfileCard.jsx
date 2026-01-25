import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";

export default function MyProfileCard() {
  const profile = useAuthStore((state) => state.user);
  const userType = useAuthStore((state) => state.userType);
  console.log(profile)
  if (!profile || !userType) return null;

  const isAdmin = userType === "admin";

  const handleEdit = () => {
   
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4">
      <Card className="max-w-xl mx-auto rounded-2xl border border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(12,10,9,0.06)] hover:shadow-[0_8px_24px_rgba(12,10,9,0.08)] transition-shadow duration-300">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 ring-2 ring-purple-600/20">
              <AvatarImage src={profile.profilePic} alt={profile.name} />
              <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold text-slate-900">{profile.name}</CardTitle>
              <p className="text-sm text-slate-600">{profile.email}</p>
            </div>
          </div>

          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="gap-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-3 mt-2 text-sm text-slate-700">
          <p>
            <span className="font-medium text-slate-900">Mobile:</span> {profile.mobileNo}
          </p>
          <p>
            <span className="font-medium text-slate-900">Company:</span> {profile.company?.name}
          </p>
          <p>
            <span className="font-medium text-slate-900">Industry:</span> {profile.company?.industry}
          </p>
            
            {
                isAdmin && (
                    <p>
  <span className="font-medium text-slate-900">Address :</span>{" "}
    {profile.company.address}
</p>
                )
            }
          {!isAdmin && (
            <>
              <p>
                <span className="font-medium text-slate-900">Employee Code:</span> {profile.employeeCode}
              </p>
              <p>
                <span className="font-medium text-slate-900">Role:</span> {profile.role}
              </p>
              <p>
                <span className="font-medium text-slate-900">Type:</span> {profile.type}
              </p>
              <p>
                <span className="font-medium text-slate-900">Department:</span> {profile.department?.name}
              </p>
              <p>
                <span className="font-medium text-slate-900">Designation:</span> {profile.designation?.name}
              </p>
              <p>
                <span className="font-medium text-slate-900">Address 1:</span>  {profile.address1} 
              </p>
              <p>
                <span className="font-medium text-slate-900">Address 2:</span> {profile.address2}
              </p>
              <p>
                <span className="font-medium text-slate-900">Status:</span> {profile.isActive ? "Active" : "Inactive"}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}