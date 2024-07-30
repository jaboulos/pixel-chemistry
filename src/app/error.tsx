'use client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import { BiSolidError } from 'react-icons/bi'

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // TODO save for later, possibly incorporate sentry
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error)
  // }, [error])

  return (
    <div className="flex items-center justify-center vertical-center ">
      <Card className="w-2/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center text-red-600">
            <BiSolidError size={30} />
            <h1 className="text-3xl font-semibold ">Error</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-center text-zinc-500">
            {error.message}
          </div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            color="default"
            variant="bordered"
          >
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
