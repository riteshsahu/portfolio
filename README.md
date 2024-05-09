# TODO

### Database

```shell
# Migrate Database
# Note: this will also run seed
prisma migrate dev --name <name>

# Seed Database
prisma db seed

# When schema is updated, re-run -
prisma generate
```
