import React from 'react'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { GiPadlock } from 'react-icons/gi'

export const LoginForm = () => {
  return (
    <>
      <Card className="w/25 mx-auto">
        <CardHeader className="flex flex-col items-center justify-normal">
          <div className="flex flex-col gap-2 items-center text-zinc-500">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Login</h1>
            </div>
            <p className="text-neutral-500">Welcome back to Pixel Chemistry</p>
          </div>
        </CardHeader>
        <CardBody>
          <form action="">
            <div className="space-y-4">
              <Input label="Email" variant="bordered" />
              <Input label="Password" type="password" variant="bordered" />
              <Button fullWidth color="secondary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  )
}

export default LoginForm
