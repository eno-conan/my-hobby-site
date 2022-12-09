import prisma from '../client'

interface CreateDummy {
    name: string
}

export async function createDummy(user: CreateDummy) {
    if (user.name) {
        return await prisma.dummy.create({
            data: user,
        })
    } else {
        return new Error('User must accept terms!')
    }
}

// interface UpdateUser {
//     id: number
//     name: string
//     email: string
// }

// export async function updateUsername(user: UpdateUser, ctx: Context) {
//     return await ctx.prisma.user.update({
//         where: { id: user.id },
//         data: user,
//     })
// }