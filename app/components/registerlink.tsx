import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button } from '@/components/ui/button'

export function KindeRegisterLink() {
    return (
        <Button variant="ghost" asChild>
            <RegisterLink>Sign Up</RegisterLink>
        </Button>
    )
}