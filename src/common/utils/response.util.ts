import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiResponse {
  static success(
    message: string,
    data: any = null,
    statusCode = HttpStatus.OK,
  ) {
    return {
      success: true,
      message,
      statusCode,
      data,
    };
  }

  static error(error: any) {
    if (error instanceof HttpException) {
      const status = error.getStatus();
      const response = error.getResponse();

      return {
        success: false,
        statusCode: status,
        message:
          typeof response === 'string'
            ? response
            : (response as any).message || 'Something went wrong',
      };
    }

    return {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
  }
}

export async function handleController(
  handler: () => Promise<any>,
  successMessage: string = 'Success',
  statusCode: number = HttpStatus.OK,
) {
  try {
    const data = await handler();
    return ApiResponse.success(successMessage, data, statusCode);
  } catch (error) {
    return ApiResponse.error(error);
  }
}
