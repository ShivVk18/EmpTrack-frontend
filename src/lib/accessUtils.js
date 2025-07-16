import { ROLE_PERMISSIONS } from "constants/rolePermissions";
import { PERMISSION_TO_FEATURE_MAP } from "@/config/permissionToFeatureMap";
import { FEATURES } from "@/config/features";

export const getAccessibleFeatures = (role, userType) => {
  if (!role || !userType) return [];

  if (userType === "admin") {
    return Object.values(FEATURES);
  }

  const permissions = ROLE_PERMISSIONS[role] || [];

  const featureKeys = new Set();

  for (const permission of permissions) {
    const mapped = PERMISSION_TO_FEATURE_MAP[permission];

    if (mapped) {
      featureKeys.add(mapped);
    } else {
      const [resource] = permission.split(":");
      const fallback = PERMISSION_TO_FEATURE_MAP[`${resource}:manage`];
      if (fallback) featureKeys.add(fallback);
    }
  }

  return [...featureKeys].map((key) => FEATURES[key]).filter(Boolean);
};
