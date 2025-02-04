import {
  pipeline,
  type QuestionAnsweringPipeline,
  type TextClassificationPipeline,
  type TokenClassificationPipeline,
} from '@huggingface/transformers';

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  private constructor() {}
  static task = 'feature-extraction';
  static model = 'Xenova/multilingual-e5-small';
  static instance: Promise<TextClassificationPipeline>;

  static async getInstance(progress_callback = null) {
    PipelineSingleton.instance ??= pipeline(
      PipelineSingleton.task,
      PipelineSingleton.model,
      { progress_callback },
    );
    return PipelineSingleton.instance;
  }
}
const ctx: Worker = self;
ctx.addEventListener('message', async (event) => {
  console.log(`[WORKER]: Start ${event.data.id}`);

  const featureExtraction = await PipelineSingleton.getInstance((x) => {
    self.postMessage(x);
  });

  const output = await featureExtraction(event.data.text, {
    pooling: 'mean',
    quantize: true,
  });
  console.log(`[WORKER]: END ${event.data.id}`);
  self.postMessage({
    status: 'complete',
    hash: event.data.id,
    output: Array.from(output.data),
  });
});
export default ctx;
