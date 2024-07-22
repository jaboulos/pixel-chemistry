'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { GiPadlock } from 'react-icons/gi'

export const LoginForm = () => {
  // hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log('data', data)
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                // {...register('email', { required: true })} // this syntax for no error message and only highlight
                {...register('email', { required: 'Email is required' })}
                defaultValue=""
                label="Email"
                variant="bordered"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message as string}
              />
              <Input
                // {...register('password', { required: true })} // this syntax for no error message and only highlight
                {...register('password', { required: 'Password is required' })}
                defaultValue=""
                label="Password"
                type="password"
                variant="bordered"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
              />
              <Button
                fullWidth
                isDisabled={!isValid}
                color="secondary"
                type="submit"
              >
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
