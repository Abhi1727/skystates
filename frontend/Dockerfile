# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG REACT_APP_API_URL
ARG REACT_APP_CLERK_PUBLISHABLE_KEY
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_CLERK_PUBLISHABLE_KEY=${REACT_APP_CLERK_PUBLISHABLE_KEY}

RUN ESLINT_NO_DEV_ERRORS=true npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
