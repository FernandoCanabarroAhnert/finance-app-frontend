FROM node:lts AS builder

ARG KEYCLOAK_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_CLIENT
ARG API_URL

ENV VITE_KEYCLOAK_URL=$KEYCLOAK_URL
ENV VITE_KEYCLOAK_REALM=$KEYCLOAK_REALM
ENV VITE_KEYCLOAK_CLIENT=$KEYCLOAK_CLIENT
ENV VITE_API_URL=$API_URL

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/static
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]