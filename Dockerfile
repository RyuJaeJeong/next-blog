FROM node:18.20.4-slim
WORKDIR /next-blog
COPY . .
RUN ["npm", "install"]
RUN ["npm", "run", "build"]
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
LABEL authors="financeRyu"
#CMD ["npm", "start"]
