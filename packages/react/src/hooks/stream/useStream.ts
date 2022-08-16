import { GetStreamArgs, LPMSProvider, Stream, getStream } from 'livepeer';

import { QueryClientContext } from '../../context';
import { UseInternalQueryOptions, useInternalQuery } from '../../utils';
import { useLPMSProvider } from '../providers';

export function useStream<TLPMSProvider extends LPMSProvider>(
  args?: Partial<GetStreamArgs> & Partial<UseInternalQueryOptions<Stream>>,
) {
  const lpmsProvider = useLPMSProvider<TLPMSProvider>();

  return useInternalQuery({
    context: QueryClientContext,
    queryKey: [{ entity: 'getStream', args, lpmsProvider }],
    queryFn: async () => getStream<TLPMSProvider>(args as GetStreamArgs),
    enabled: Boolean(typeof args === 'string' ? args : args?.streamId),
    ...(typeof args === 'object' ? args : {}),
  });
}