import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BackgroundOrbs } from "./BackgroundOrbs";
import { Sidebar } from "./Sidebar";
import { MobileMenuOverlay } from "./MobileMenuOverlay";
import { Topbar } from "./Topbar";
import { StatsGrid } from "./StatsGrid";
import { FeatureCard } from "./FeatureCard";

export function DashboardLayout({
  config,
  children,
  welcomeMessage,
  notifications,
  searchPlaceholder,
  actionButton,
  timeInfo,
  unreadCount,
  showFeatureGrid = true,
  minimalLayout = false,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeFeature = useMemo(() => {
    const features = config.features || [];
    if (!features.length) return "";

    const match =
      features.find((f) => f.path && location.pathname.startsWith(f.path)) ||
      features[0];

    return match.title;
  }, [config.features, location.pathname]);

  const handleFeatureSelect = (feature) => {
    if (feature?.path) {
      navigate(feature.path);
    }
  };

  const defaultWelcomeMessage = {
    title: `Good morning, ${config.user.name.split(" ")[0]}! 👋`,
    subtitle: `Here's your ${config.variant} overview for today`,
  };

  const welcome = welcomeMessage || defaultWelcomeMessage;

  return (
    <div className="min-h-screen flex bg-amber-50 relative overflow-hidden">
      <BackgroundOrbs variant={config.variant} />

      <Sidebar
        config={config}
        activeFeature={activeFeature}
        onFeatureSelect={(title) =>
          handleFeatureSelect(config.features.find((f) => f.title === title))
        }
      />

      <MobileMenuOverlay
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        config={config}
        activeFeature={activeFeature}
        onFeatureSelect={(title) =>
          handleFeatureSelect(config.features.find((f) => f.title === title))
        }
      />

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Topbar
          onMenuToggle={() => setMobileMenuOpen(true)}
          config={config}
          notifications={notifications}
          searchPlaceholder={searchPlaceholder}
          actionButton={actionButton}
          timeInfo={timeInfo}
          unreadCount={unreadCount}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {/* Welcome */}
          {!minimalLayout && (
            <>
              {/* Welcome */}
              <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2">
                  {welcome.title}
                </h1>
                <p className="text-amber-800 text-base lg:text-lg">
                  {welcome.subtitle}
                </p>
              </div>

              {config.stats && <StatsGrid stats={config.stats} />}
            </>
          )}

         
          {children}

          
         {!minimalLayout && showFeatureGrid && config.features?.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
    {config.features.map((feature) => (
      <FeatureCard
        key={feature.title}
        {...feature}
        isActive={activeFeature === feature.title}
        onClick={() => handleFeatureSelect(feature)}
        variant={config.variant}
      />
    ))}
  </div>
)}
        </main>
      </div>
    </div>
  );
}
