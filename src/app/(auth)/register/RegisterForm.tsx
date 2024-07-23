'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { GiPadlock } from 'react-icons/gi'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema'
import { registerUser } from '@/app/actions/authActions'

export const RegisterForm = () => {
  // hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    /*client side validation.  The resolver connects form validation schema (defined with Zod) to the react-hook-form library. This allows react-hook-form to leverage the Zod schema to validate form data.

    The zodResolver(registerSchema) function is a utility that wraps my Zod schema in a format that react-hook-form can understand. This integration streamlines the validation process, allowing me to define my validation rules using Zod and have react-hook-form handle the form submission and validation seamlessly.
    */
    // resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)
    console.log('result', result)
  }

  return (
    <>
      <Card className="w-2/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-normal">
          <div className="flex flex-col gap-2 items-center text-zinc-500">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Register</h1>
            </div>
            <p className="text-neutral-500">Welcome to Pixel Chemistry</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                {...register('name')}
                defaultValue=""
                label="Name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
              <Input
                // {...register('email', { required: true })} // this syntax for no error message and only highlight
                {...register('email')}
                defaultValue=""
                label="Email"
                variant="bordered"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
              <Input
                // {...register('password', { required: true })} // this syntax for no error message and only highlight
                {...register('password')}
                defaultValue=""
                label="Password"
                type="password"
                variant="bordered"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <Button
                fullWidth
                isDisabled={!isValid}
                color="primary"
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  )
}

export default RegisterForm
