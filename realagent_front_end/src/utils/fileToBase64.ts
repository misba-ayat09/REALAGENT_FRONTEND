interface FileValidationOptions {
  allowedTypes?: string[];
  maxSizeInBytes?: number;
}

export const fileToBase64 = (file: File, options?: FileValidationOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided.'));
    }

    if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return reject(
        new Error(`Invalid file type: ${file.type}. Allowed types are: ${options.allowedTypes.join(', ')}`),
      );
    }

    if (options?.maxSizeInBytes && file.size > options.maxSizeInBytes) {
      const maxSizeInMB = (options.maxSizeInBytes / (1024 * 1024)).toFixed(2);
      return reject(new Error(`File size exceeds the limit of ${maxSizeInMB} MB.`));
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };

    reader.onerror = () => reject(new Error('Error reading the file.'));

    reader.onabort = () => reject(new Error('File reading was aborted.'));

    try {
      reader.readAsDataURL(file);
    } catch (err) {
      reject(new Error('Failed to process the file.'));
    }
  });
};
