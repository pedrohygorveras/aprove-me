import { PrismaService } from '../src/database/prisma.service';
import { UsersService } from '../src/modules/users/users.service';
import { UserRole } from '../src/modules/common/constants/permissions/role.enum';

class Seed {
  private usersService: UsersService;

  constructor(private prisma: PrismaService) {
    this.usersService = new UsersService(prisma);
  }

  async run() {
    console.log('Starting seeding...');

    await this.createAdminUser();

    console.log('Seeding completed.');
  }

  private async createAdminUser() {
    const name = 'Pedro';
    const login = 'aprovame';
    const email = 'pedrohygorveras@gmail.com';
    const password = 'aprovame';

    const existingUser = await this.usersService.findByLogin(login);

    if (!existingUser) {
      await this.usersService.create({
        name,
        login,
        email,
        password,
        role: UserRole.Admin,
      });
      console.log(`User "${login}" created with role ${UserRole.Admin}.`);
    } else {
      console.log(`User "${login}" already exists. Skipping creation.`);
    }
  }
}

async function main() {
  const prisma = new PrismaService();
  const seed = new Seed(prisma);

  try {
    await seed.run();
  } catch (error) {
    console.error('Seeding failed', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('Seeding failed');
  console.error(e);
  process.exit(1);
});
