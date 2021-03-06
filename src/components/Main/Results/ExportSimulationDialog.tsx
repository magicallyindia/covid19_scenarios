import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import {
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
} from 'react-share'
import { AllParams } from '../../../algorithms/types/Param.types'
import { AlgorithmResult } from '../../../algorithms/types/Result.types'
import { exportAll, exportParams, exportResult } from '../../../algorithms/utils/exportResult'
import ClipboardButton from '../../Buttons/ClipboardButton'

export interface ExportSimulationDialogProps {
  canExport: boolean
  showModal: boolean
  toggleShowModal: () => void
  openPrintPreview: () => void
  params?: AllParams
  result?: AlgorithmResult
  scenarioUrl: string
}

export default function ExportSimulationDialog({
  showModal,
  toggleShowModal,
  openPrintPreview,
  params,
  result,
  scenarioUrl,
}: ExportSimulationDialogProps) {
  const { t } = useTranslation()

  const startPrinting = () => {
    toggleShowModal()
    openPrintPreview()
  }

  // Assuming href and shareable link can be concatenated without other processing:
  const shareableLink = `${window.location.href}${scenarioUrl}`

  // Size in pixels for the external icons like facebook, email
  const externalIconSize = 25

  // Boolean to control the shape of the external icons
  const isRoundIcon = true

  return (
    <Modal className="height-fit" centered size="lg" isOpen={showModal} toggle={toggleShowModal}>
      <ModalHeader toggle={toggleShowModal}>{t('Export simulation')}</ModalHeader>
      <ModalBody>
        <Table>
          <thead>
            <tr>
              <th>{t('Filename')}</th>
              <th>{t('Description')}</th>
              <th>{t('Format')}</th>
              <th>{t('Action')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>covid.params.json</td>
              <td>{t('The simulation parameters')}</td>
              <td>JSON</td>
              <td>
                <Button
                  disabled={!params}
                  onClick={params ? () => exportParams(params) : undefined}
                  color="primary"
                  size="sm"
                >
                  {t('Download')}
                </Button>
              </td>
            </tr>
            <tr>
              <td>covid.summary.tsv</td>
              <td>{t('The summarized results of the simulation')}</td>
              <td>TSV</td>
              <td>
                <Button
                  disabled={!(result?.trajectory.mean ?? null)}
                  onClick={() => result && exportResult(result, 'covid.summary.tsv')}
                  color="primary"
                  size="sm"
                >
                  {t('Download')}
                </Button>
              </td>
            </tr>
            <tr>
              <td>covid.allresults.tsv</td>
              <td>{t('The full age-stratified results of the simulation')}</td>
              <td>TSV</td>
              <td>
                <Button
                  disabled={!(result?.trajectory.mean ?? null)}
                  onClick={() =>
                    result &&
                    exportResult(result, 'covid.allresults.tsv', Object.keys(result.trajectory.mean[0].current.severe))
                  }
                  color="primary"
                  size="sm"
                >
                  {t('Download')}
                </Button>
              </td>
            </tr>
            <tr>
              <td />
              <td>{t('Shareable link')}</td>
              <td>URL</td>
              <td>
                <ClipboardButton disabled={!(result?.trajectory ?? null)} textToCopy={shareableLink}>
                  {t('Copy link')}
                </ClipboardButton>
                <div>
                  <TwitterShareButton url={shareableLink}>
                    <TwitterIcon size={externalIconSize} round={isRoundIcon} />
                  </TwitterShareButton>
                  <EmailShareButton url={shareableLink}>
                    <EmailIcon size={externalIconSize} round={isRoundIcon} />
                  </EmailShareButton>
                  <FacebookShareButton url={shareableLink}>
                    <FacebookIcon size={externalIconSize} round={isRoundIcon} />
                  </FacebookShareButton>
                </div>
              </td>
            </tr>
            <tr>
              <td />
              <td>{t('Print Preview (to print or save as PDF)')}</td>
              <td>HTML</td>
              <td>
                <Button disabled={!(result?.trajectory.mean ?? null)} onClick={startPrinting} color="primary" size="sm">
                  {t('Preview')}
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          disabled={!result || !params}
          onClick={result && params ? () => exportAll(params, result) : undefined}
        >
          {t('Download all as zip')}
        </Button>
        <Button color="primary" onClick={toggleShowModal}>
          {t('Done')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
