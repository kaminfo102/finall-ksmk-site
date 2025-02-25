import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">صفحه مورد نظر یافت نشد</h2>
        <p className="text-muted-foreground mb-8">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
        </p>
        <Link href="/">
          <Button size="lg">بازگشت به صفحه اصلی</Button>
        </Link>
      </div>
    </div>
  )
}