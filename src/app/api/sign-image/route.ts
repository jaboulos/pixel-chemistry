import { cloudinary } from '@/lib/cloudinary'

export async function POST(request: Request) {
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>
  }
  const { paramsToSign } = body

  const signature = cloudinary.v2.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string,
  )

  return Response.json({ signature })
}

// import { NextRequest, NextResponse } from 'next/server'
// import { cloudinary } from '@/lib/cloudinary'

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { paramsToSign } = body

//     const signature = cloudinary.v2.utils.api_sign_request(
//       paramsToSign,
//       process.env.CLOUDINARY_API_SECRET as string,
//     )

//     return NextResponse.json({ signature })
//   } catch (error) {
//     console.error('Error generating signature:', error)
//     return NextResponse.json(
//       { error: 'Error generating signature' },
//       { status: 500 },
//     )
//   }
// }
