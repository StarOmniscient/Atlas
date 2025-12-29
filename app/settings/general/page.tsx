"use client"
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";

export default function GeneralSettings() {
    const { updateBadge } = useNavigation()
    
    return (
        <div>
        <Button onClick={() => updateBadge("Development", "CI/CD Pipelines", "534")}>
            Update Badge
        </Button>
        <Button onClick={() => updateBadge("Development", "CI/CD Pipelines", "5aras")}>
            Update Badge2
        </Button>
        <Button onClick={() => updateBadge("Development", "CI/CD Pipelines", "sdf4")}>
            Update Badge3
        </Button>
        <Button onClick={() => updateBadge("Development", "CI/CD Pipelines", "ur6us4")}>
            Update Badge4
        </Button>
        </div>
    )
}