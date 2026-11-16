// server/src/modules/health/health.controller.ts
import { config } from '../../config';
import { getDBStatus } from '../../config/db';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const getHealth = catchAsync(async (_req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: 'RICOVERSE API is running',
    data: {
      status: 'ok',
      env: config.env,
      db: getDBStatus(),
      uptime: Number(process.uptime().toFixed(1)),
    },
  });
});

export const HealthController = { getHealth };
