import { Button } from '@/components/base/buttons/button';
import { GUIDE_CHAPTERS } from '../../onboarding/guide-catalog';
import { openGuide } from '../../onboarding/guide-state';
import { Disclosure } from '../settings/section';

export function GuideFieldDetails({ details }: { details?: readonly [string, string][] }) {
  return details?.length ? <dl className="flex flex-col gap-3">{details.map(([title, body]) => <div key={title} className="flex flex-col gap-1"><dt className="text-body-2-medium text-text-primary">{title}</dt><dd className="text-body-2-regular text-text-secondary">{body}</dd></div>)}</dl> : null;
}

/** 偏好设置各页的章节入口：一句概要，再从这里开始这一章导览，不接管设置的保存行为。 */
export function GuideHelp({ chapter }: { chapter?: string }) {
  const group = GUIDE_CHAPTERS.find(row => row.id === chapter);
  if (!group) return null;
  return <div className="text-body-2-regular text-text-secondary">
    <Disclosure summary="了解这些设置">
      <p>{group.summary}</p>
      <div><Button variant="secondary" size="small" onClick={() => openGuide({ chapter })}>逐步了解这个分区</Button></div>
    </Disclosure>
  </div>;
}
