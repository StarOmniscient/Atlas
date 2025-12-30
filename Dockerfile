FROM node:25-alpine

LABEL authors="Akaryth"
WORKDIR /application

ENV NODE_ENV=production 

# NEXTAUTH
ENV NEXTAUTH_SECRET=""
ENV NEXTAUTH_URL=""

# DATABASE
ENV DB_HOST=""
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV DB_DATABASE=""
ENV DB_TYPE="mysql"
ENV DATABASE_URL="${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}"



# Copy dependency files
COPY package.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy application source
COPY . .

# Prisma setup
RUN npx prisma migrate deploy
RUN npx prisma generate

# Build Next.js app
RUN npm run build

CMD ["npm", "start"]
