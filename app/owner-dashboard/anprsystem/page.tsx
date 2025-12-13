    const CAMERA_URL = process.env.NEXT_PUBLIC_ANPR_CAMERA_URL || "http://192.168.0.100"

export default function OwnerAnprSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">ANPR tizimi</h1>
        <p className="text-sm text-slate-500 mt-1">
          ANPR kamera web-interfeysi kamera IP manzili orqali ochiladi.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 card-shadow-lg border border-slate-100 dark:border-slate-800">
        {CAMERA_URL ? (
          <div className="w-full h-[600px]">
            <iframe
              src={CAMERA_URL}
              className="w-full h-full rounded-xl border border-slate-200 dark:border-slate-700"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            ANPR kamera IP manzili sozlanmagan. Iltimos, tizim administratoriga murojaat qiling.
          </p>
        )}
      </div>
    </div>
  )
}